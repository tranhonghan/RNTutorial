import React, { Component } from "react";
import {View, FlatList, ActivityIndicator} from "react-native";
import { Container, Header, Item, List, ListItem, Left, 
  Body, Icon, Thumbnail, Text, Input} from 'native-base';
import _ from "lodash";
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      query: "",
      fullData: []
    };
  }
  componentDidMount() {
    this.requestAPIPhotos();
  }
  requestAPIPhotos = _.debounce(() => {
    this.setState({ loading: true });
    const apiURL = "https://jsonplaceholder.typicode.com/photos?_limit=30&_page=1" 
      fetch(apiURL).then((res) => res.json())
        .then((resJson) => {
          this.setState({ 
            loading: false,
            data: resJson,
            fullData: resJson
          })
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  }, 250);

  handleSearch = (text) => {
    const formattedQuery = text.toLowerCase();
    const data = _.filter(this.state.fullData, photo => {
        if (photo.title.includes(formattedQuery)) {
          return true;
        }
        return false;
    });
    this.setState({ data, query: text });
  };

  renderSearchBar = () => {
    return (
      <Header searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search"  
            onChangeText={this.handleSearch} />
          </Item>
        </Header>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  _renderItem = ({item, index}) => {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail source={{ uri: item.thumbnailUrl }} />
        </Left>
        <Body>
          <Text>{item.title}</Text>
        </Body>
      </ListItem>
    )
  }

  render() {
    return (
      <Container>
        {this.renderSearchBar()}
        <List>
          <FlatList
            data={this.state.data}
            renderItem={this._renderItem}
            keyExtractor={item => item.email}
            ListFooterComponent={this.renderFooter}
          />
        </List>
      </Container>
    );
  }
}