const formidable = require('formidable');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sequelize = require('../../utils/db');
const { Service } = require('../../models/models');

const createDataService = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(404).send();
  }
  try {
    const form = new formidable.IncomingForm();
    const uploadDir = './public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Failed to parse form data' });
      }

      const { id, ...data } = fields;
      const existingData = await Service.findOne({ where: { id } });

      if (existingData && Object.keys(files).length) {
        const fileExtension = files.img.originalFilename.split('.').pop();
        const imageName = `${uuidv4()}.${fileExtension}`;
        fs.renameSync(files.img.filepath, `${uploadDir}/${imageName}`);

        await Service.update(
          { img: imageName, ...data },
          { where: { id } }
        );
      } else if (existingData) {
        await Service.update(data, { where: { id } });
      } else if (Object.keys(files).length) {
        const fileExtension = files.img.originalFilename.split('.').pop();
        const imageName = `${uuidv4()}.${fileExtension}`;
        fs.renameSync(files.img.filepath, `${uploadDir}/${imageName}`);

        await Service.create({ img: imageName, ...data });
      } else {
        await Service.create(data);
      }
      res.status(200).json({ message: 'Данные успешно сохранены!' });
    });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save data' });
  }
};

module.exports = {
  createDataService,
};
