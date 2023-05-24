
const Header = ({ data }) => {
  return (
    <header className="relative z-50 py-2">
      <div className="container mx-auto">
        <div className="text-white">
          <div className="flex items-center">
            <a href={`tel:${data.tel1.replace(/\s/g, '')}`}
              className="text-xl"
            >
              {data.tel1}
            </a>
          </div>
          <div className="flex items-center">
            <a href={`tel:${data.tel2.replace(/\s/g, '')}`}
              className="text-xl"
            >
              {data.tel2}
            </a>
          </div>
        </div>
        <p className="font-light text-white mt-2 uppercase text-xs">
          Режим работы: {data.rezhim}
        </p>
      </div>
    </header>
  )
}

export default Header
