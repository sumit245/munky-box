import React, { Component } from 'react'
import { SearchBar } from 'react-native-elements';

export default class SearchLayout extends Component {
    state = {
        search: '',
      };
    
      updateSearch = (search) => {
        this.setState({ search });
      };
    render() {
        const { search } = this.state;
        return (
        <SearchBar
        lightTheme
        clearIcon
        inputStyle={{color:'#004d40'}}
        inputContainerStyle={{backgroundColor:'#ededed',padding:0,marginBottom:-8,borderColor:'#fefefe'}}
        containerStyle={{backgroundColor:'#ffffff',borderWidth:2,margin:-8,marginBottom:-10, borderColor:'#fdfdfd'}}
        placeholder="Search Your Food..."
        onChangeText={this.updateSearch}
        value={search}
      />
        )
    }
}
