import React, { useState, useEffect } from 'react'
import { Select, SelectProps } from '@mui/base/Select'
import { fetchAllLocations } from '../../api/datafetcher'
import { Location } from '../../dto'
import { StyledButton, StyledListbox, StyledPopper, StyledOption, Paragraph } from '../../styles/style'

interface LocationProps {
  onChange: (data: string) => void
}

function CustomSelect(props: SelectProps<string, false>) {
  const slots: SelectProps<string, false>['slots'] = {
    root: StyledButton,
    listbox: StyledListbox,
    popper: StyledPopper,
    ...props.slots,
  }

  return <Select className='select-box' {...props} slots={slots} />
}

const LocationSelector: React.FC<LocationProps> = ({ onChange }) => {
  const [location, setLocation] = useState<string>('')
  const [allLocations, setAllLocations] = useState<Location[]>([])

  useEffect(() => {
    const fetchLocations = async () => {
      const locations = await fetchAllLocations()
      setAllLocations(locations)
    }
    fetchLocations()
  }, [])

  const handleLocationChange = (_: any, newValue: string | null) => {
    if (newValue !== null) {
      onChange(newValue)
      setLocation(newValue)
    }
  }

  return (
    <div>
      <h2 className='title'>Select Location</h2>
      <CustomSelect className='select-box' value={location} onChange={handleLocationChange}>
        {allLocations.map((location) => (
          <StyledOption key={location.name} value={location.name}>
            {location.name}
          </StyledOption>
        ))}
      </CustomSelect>
      {location && <Paragraph>Selected location: {location}</Paragraph>}
    </div>
  )
}

export default LocationSelector
