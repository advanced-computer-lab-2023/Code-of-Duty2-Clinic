import React, { Component, ChangeEvent } from 'react';

interface FilterBarProps {
  onFilterChange: (selectedDate: string, selectedStatus: string) => void;
}

interface FilterBarState {
  selectedDate: string;
  selectedStatus: string;
}

class FilterBar extends Component<FilterBarProps, FilterBarState> {
  constructor(props: FilterBarProps) {
    super(props);
    this.state = {
      selectedDate: '',
      selectedStatus: 'upcoming', 
    };
  }

  handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ selectedDate: event.target.value });
  };

  handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({ selectedStatus: event.target.value });
  };

  handleFilterClick = () => {
    const { selectedDate, selectedStatus } = this.state;
    this.props.onFilterChange(selectedDate, selectedStatus);
  };

  render() {
    const { selectedDate, selectedStatus } = this.state;

    return (
      <div className="filter-bar">
        <div className="filter-option">
          <label>Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={this.handleDateChange}
          />
        </div>

        <div className="filter-option">
          <label>Status:</label>
          <select
            value={selectedStatus}
            onChange={this.handleStatusChange}
          >
            <option value="All">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
            <option value="canceled">Canceled</option>
            <option value="rescheduled">Rescheduled</option>
          </select>
        </div>

        <button onClick={this.handleFilterClick}>Apply Filters</button>
      </div>
    );
  }
}

export default FilterBar;
