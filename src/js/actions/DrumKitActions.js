var DrumKitDispatcher = require('../dispatcher/DrumKitDispatcher');
var DrumKitConstants = require('../constants/DrumKitConstants');

var DrumKitActions = {
  addItem: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.ADD_ITEM,
      item: item
    })
  },

  copyMeasure: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.COPY_MEASURE,
      item: item
    })
  },

  pastMeasure: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.PAST_MEASURE,
      item: item
    })
  },

  isPasting: function(item){
    console.log("DrumkitAction: " + item)
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.IS_PASTING,
      ispasting: item
    })
  },

  bpmChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BPM,
      item: item
    })
  },

  dpbChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_DPB,
      item: item
    })
  },

  beatpermeasureChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BEATPEARMEASURE,
      item: item
    })
  },

  bitPushed: function(bitpushed){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.BIT_PUSHED,
      bitpushed: bitpushed
    })
  },

  setCurrentTime: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.SET_CURRENTTIME,
      item: item
    })
  },


  pausedtimeChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_PAUSEDTIME,
      item: item
    })
  },

  playDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.PLAY_DRUMKIT
    })
  },

  stopDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.STOP_DRUMKIT
    })
  },

  changeBit:function(instrument, bitindex, bit){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_BIT,
      instrument: instrument,
      bitindex: bitindex,
      bit: bit
    })
  },

  loadDrumKit: function(){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.LOAD_DRUMKIT
    })
  },

  timeChange: function(item){
    DrumKitDispatcher.handleViewAction({
      actionType:DrumKitConstants.CHANGE_TIME,
      item: item
    })
  }
}

module.exports = DrumKitActions
