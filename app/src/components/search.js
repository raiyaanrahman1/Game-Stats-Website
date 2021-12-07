import React from 'react';
import Select, {createFilter} from 'react-select'





export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            value: ""
        }
        
    }

    componentDidMount(){
        fetch("api/games/")
        .then( res => res.json())
        .then( res2 => {
            
            this.setState({ options: res2.games.map(game => { return { label: game.title, value: game._id }; }) })

        } )
    }

    handleChange(e){
        console.log(e)
        this.props.callback(e)
    }
    
    render() {
        const customStyles = {
            option: provided => ({
              ...provided,
              color: 'black'
            }),
            control: provided => ({
              ...provided,
              color: 'black',
              width: this.props.width || 200,
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'black'
            })
        }

        const stringify = option => option.label;
        const filterOption = createFilter({ matchProp: "label", stringify });
        console.log(this.state.options)
        return (
            <div>
              <span title="Search for games">
              <Select 
                styles={customStyles}
                options={this.state.options} 
                onChange={this.handleChange.bind(this)}
                filterOption={filterOption} 
              />
            </span>
            </div>
          )
    }
  }