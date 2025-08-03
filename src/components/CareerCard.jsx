const CareerCard = ({status, company, position, description, img}) => {

    let statusColor = "" // status color set below

    if (status == "Previous") {
        statusColor = "purple"
    } else if (status == "Incoming") {
        statusColor = "green"
    } else { // Current
        statusColor = "orange"
    }
    

    return (
        <div className={`bg-gray-900 p-6 rounded-lg border-l-4 border-${statusColor}-400 hover:bg-gray-800 transition-all duration-300 group shadow-lg hover:shadow-xl`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className={`font-semibold text-lg text-${statusColor}-400 mb-2`}>{status}</h3>
                    <h4 className="text-blue-400 text-xl font-bold mb-1 group-hover:text-blue-300 transition-colors">{company}</h4>
                    <p className="text-green-400 text-lg font-medium mb-3">{position}</p>
                </div>
                <div className="ml-6 flex-shrink-0">
                    <div className="w-16 h-16 rounded-lg p-2 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                        <img 
                            src={img} 
                            alt={`${company} logo`} 
                            className="max-w-full max-h-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                {description.map((d, idx) => {
                    return (
                        <p key={idx} className="text-gray-300 leading-relaxed hover:text-gray-200 transition-colors">
                            - {d}
                        </p>
                    )
                })}
            </div>
        </div>
    )
}

export default CareerCard;