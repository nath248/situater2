import './EditLocation.css'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getLocation, updateLocation } from '../../services/locations'

function EditLocation() {

  let navigate = useNavigate()

  const [location, setLocation] = useState({
    name: '',
    image: '',
  })

  let { id } = useParams()

  useEffect(() => {
    const fetchlocation = async () => {
      const location = await getLocation(id)
      setLocation(location)
    }
    fetchlocation()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocation({
      ...location,
      [name]: value,
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    await updateLocation(id, location)
    navigate(`/locations/${id}`)
  }

  return (
    <div className='edit-location-main'>
      <form onSubmit={handleSubmit}>
        <label>Location Name:</label>
        <input placeholder='Enter Name' value={location.name} name='name' required onChange={handleChange} />
        <label>Image URL:</label>
        <input placeholder='Enter Image URL' value={location.image} name='image' required onChange={handleChange} />
        <button type='submit'>EDIT</button>
      </form>
    </div>
  )
}

export default EditLocation;