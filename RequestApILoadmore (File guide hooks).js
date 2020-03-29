import React, {Component} from 'react';
import { StyleSheet, FlatList, View, Text, 
  Image, ActivityIndicator, SafeAreaView,
} from 'react-native';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      page: 1,
      loading: false,
    };
  }
  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({loading: true});
    const apiURL = `http://jsonplaceholder.typicode.com/todos?_limit=10&_page=${this.state.page}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(resJson => {
        this.setState({
          data: this.state.data.concat(resJson),
          // function "concat" used to join two or more arrays
          loading: false,
        });
      });
  };

  renderRow = ({index, item}) => {
    return (
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>{`${index}) ` + item.title}</Text>
      </View>
    );
  };

  renderFooter = () => {
    // ActivityIndicator Displays a circular loading indicator.
    return this.state.isLoading ? (
      <View style={styles.loader}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  handleLoadMore = () => {
    this.setState({page: this.state.page + 1, loading: true}, this.getData);
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          style={styles.container}
          data={this.state.data}
          renderItem={this.renderRow}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: '#f5fcff',
  },
  itemRow: {
    borderBottomColor: '#ccc',
    marginBottom: 10,
    borderBottomWidth: 1,
  },
  itemText: {
    fontSize: 16,
    padding: 5,
  },
  loader: {
    marginTop: 10,
    alignItems: 'center',
  },
});
