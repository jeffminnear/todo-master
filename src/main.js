import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';

module.exports = React.createClass({
  getInitialState() {
    return ({
      tasks: ['Take out the trash', 'Get groceries', 'Practice piano'],
      completedTasks: [],
      task: ''
    })
  },

  renderList(tasks) {
    // return individual rows based on the argued tasks
    return(
      tasks.map((task, index) => {
        return (
          <View key={task} style={styles.task}>
            <Text>
              {task}
            </Text>
            <TouchableOpacity
              onPress={()=>this.completeTask(index)}
            >
              <Text>
                &#10003;
              </Text>
            </TouchableOpacity>
          </View>
        )
      })
    )
  },

  renderCompleted(tasks) {
    return (
      tasks.map((task) => {
        return (
          <View key={task} style={styles.task}>
            <Text style={styles.completed}>
              {task}
            </Text>
          </View>
        )
      })
    )
  },

  completeTask(index) {
    console.log('complete task: ', this.state.tasks[index]);
    let tasks = this.state.tasks;
    tasks = tasks.slice(0, index).concat(tasks.slice(index + 1));

    let completedTasks = this.state.completedTasks;
    completedTasks = completedTasks.concat([this.state.tasks[index]]);

    this.setState({
      tasks,
      completedTasks
    });

    console.log('completedTasks', this.state.completedTasks);
  },

  addTask() {
    let tasks = this.state.tasks.concat([this.state.task]);
    this.setState({tasks});
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
          ToDo Master
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Add a task...'
          onChangeText={(text) => {
            this.setState({task: text});
            console.log(this.state.task);
          }}
          onEndEditing={()=> {
            this.addTask();
          }}
        />
        {this.renderList(this.state.tasks)}
        {this.renderCompleted(this.state.completedTasks)}
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontSize: 18
  },
  task: {
    flexDirection: 'row',
    height: 60,
    borderBottomWidth: 1.1,
    borderColor: 'black',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  input: {
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'black',
    textAlign: 'center',
    margin: 10
  },
  completed: {
    color: '#555',
    textDecorationLine: 'line-through'
  }
})
