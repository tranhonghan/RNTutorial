import React, {Component} from 'react';
import { StyleSheet, Text, View, 
  FlatList, Dimensions } from 'react-native';

const data = [{ key: '1' }, { key: '2' }, { key: '3' }, 
{ key: '4' }, { key: '5' }];

const formatData = (data, numColumns) => {
  const totalRows = Math.floor(data.length / numColumns); 

  let totalLastRow = data.length - (totalRows * numColumns); 
  while (totalLastRow !== 0 && totalLastRow !== numColumns) {
    data.push({ key: 'blank', empty: true });
    totalLastRow++;
  }
  return data;
};

const numColumns = 3;
export default class App extends Component {

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={formatData(data, numColumns)}
        style={styles.container}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40
  },
  item: {
    backgroundColor: '#3232ff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / numColumns
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontSize: 30
  },
});