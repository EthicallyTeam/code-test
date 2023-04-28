const characteristicList = [ // would rather call for this from the backend
	"All", // manually added option, if you could deselect could lose
  "Plastic-Free",
  "Locally Produced",
  "Humane",
  "Vegan",
  "Unhealthy",
  "Healthy",
  "Wasteful",
]

const CharacteristicPicker = (props) => {
  return (
    <>
      {
				characteristicList.map((charac) => {
					return (
						<label key={charac}>
							<input
								type="radio" 
								name="characteristic" 
								value={charac} 
								onChange={props.handleCharacChoice}
								checked={props.selectedCharac === charac}
							/>
							{charac}
						</label>
					)
				})
			}
		</>
  )
}

export default CharacteristicPicker