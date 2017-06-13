import React from 'react';
import { DropdownButton, MenuItem } from 'react-bootstrap';

class ReadStatusDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      readStatus: '' 
    };

    this.handleSelect = this.handleSelect.bind(this);
  }

  componentDidMount() {
      this.props.readStatus 
        ? this.setState(() => {
          return {
            readStatus: this.props.readStatus
          }
        })
        : 'read';
  }


  render() {
    return (
      <DropdownButton 
        title={this.state.readStatus} 
        id="read-status" 
        onSelect={this.props.writeReadStatus.bind(null, this.props.bookIndex, this.eventKey)}>
        <MenuItem eventKey="to-read">
          TO-READ
        </MenuItem>
        <MenuItem eventKey="currently-reading">CURRENTLY-READING</MenuItem>
        <MenuItem eventKey="read">READ</MenuItem>
      </DropdownButton>
    );
  }
}

export default ReadStatusDropdown;
