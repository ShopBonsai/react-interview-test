import React from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap'
import debounce from '../utils/debounce'

const Sidebar = props => {
  const debounceName = debounce((e) => {
    props.setName(e)
  }, 250)

  return (
    <div className="sidebar">
      <Form>
        <FormGroup>
          <Label for="search">Search By Name</Label>
          <Input type="text" name="email" id="search" placeholder="" onChange={e => debounceName(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="size-select">Size</Label>
          <Input type="select" name="size" id="size-select" onChange={e => props.setSize(e.target.value)}>
            <option></option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
          </Input>
        </FormGroup>
      </Form>
    </div>
  )
}

export default Sidebar