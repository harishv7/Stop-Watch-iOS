var React = require('react-native');
var formatTime = require('minutes-seconds-milliseconds');
var {
  Text,
  View,
  AppRegistry,
  TouchableHighlight,
  StyleSheet,
  ScrollView
} = React;

var StopWatch = React.createClass({
  getInitialState: function() {
    return({
      timeElapsed: null,
      running: false,
      startTime: null,
      laps: []
    });
  },
  render: function() {
    return (
      <View style={styles.container}>
      <View style={[styles.header]}>
        <View style={[styles.timerWrapper]}>
          <Text style={styles.timer}>
            {formatTime(this.state.timeElapsed)}
          </Text>
        </View>
        <View style={[styles.buttonWrapper]}>
          {this.startStopButton()}
          {this.lapButton()}
        </View>
      </View>

      <ScrollView style={[styles.footer]}>
        {this.laps()}
      </ScrollView>
      </View>
    );
  },
  laps: function() {
    return this.state.laps.map(function(time, index) {
      return <View style={styles.lap} key={index}>
        <Text style={styles.lapText}>
          Lap #{index+1}
        </Text>
        <Text style={styles.lapText}>
          {formatTime(time)}
        </Text>

      </View>
    });
  },
  startStopButton: function() {
    var style = this.state.running ? styles.stopButton : styles.startButton;
    return (
      <TouchableHighlight underlayColor="gray"
      onPress={this.handleStartPress}
      style={[styles.button, style]}
      >
        <Text style={styles.buttonLabelText}>
          {this.state.running ? "Stop" : "Start"}
        </Text>
      </TouchableHighlight>
    );
  },
  handleStartPress: function() {
    if(this.state.running) {
      clearInterval(this.interval);
      this.setState({running: false});
      return;
    }

    this.setState({startTime: new Date()});

    this.interval = setInterval(() => {
    this.setState({
      timeElapsed: new Date() - this.state.startTime,
      running: true
    });
  }, 70);
  },
  lapButton: function() {
    return (
      <TouchableHighlight style={styles.button}
      underlayColor= "gray"
      onPress={this.handleLapPress}
      >
        <Text style={styles.buttonLabelText}>
          Lap
        </Text>
      </TouchableHighlight>
    );
  },
  handleLapPress: function() {
    var lap = this.state.timeElapsed;
    this.setState({
      startTime: new Date(),
      laps: this.state.laps.concat([lap])
    });
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  header: {
    flex: 1
  },
  footer: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 10
  },
  timerWrapper: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  timer: {
    fontSize: 72,
    fontStyle: 'normal',
    fontWeight: '100',
    fontFamily: 'Helvetica Neue'
  },
  button: {
    borderWidth: 2,
    height: 100,
    width: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#F2F2F2"
  },
  startButton: {
    borderColor: "#8cba00"
  },
  stopButton: {
    borderColor: "#e74c3c"
  },
  buttonLabelText: {
    fontSize: 16,
    fontWeight: "100"
  },
  lap: {
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  lapText: {
    fontSize: 23,
    fontWeight: '200',
    fontFamily: 'Helvetica Neue'
  }
});

AppRegistry.registerComponent('stopwatch', function () {
  return StopWatch;
});

// AppRegistry.registerComponent('stopwatch', () => StopWatch);