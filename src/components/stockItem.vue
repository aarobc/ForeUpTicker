<template>
  <div class="stock">
    <div class="data">
      <h3 class="name"> {{ stock.Name }}</h3>
      <span class="short-name">{{ stock.symbol }}</span>
      <div class="change" :class="cClass">
        {{ stock.Change | change }}
      </div>
      <div class="cash">
        {{ '$' + stock.LastTradePriceOnly }}
      </div>
    </div>
    <div class="indicator">
      <div class="high">
        {{ '$' + stock.DaysHigh }}
      </div>
      <div class="low">
        {{ '$' + stock.DaysLow }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello World!'
    }
  },
  props: {
    stock: {
      type: Object,
      required: true
    }
  },
  created () {
    console.log(this.stock)
  },
  filters: {
    change (val) {
      return val.replace(/[!\+-]/g, '')
    }
  },
  computed: {
    rising () {
      return this.stock.Change.indexOf('+') > -1
    },
    cClass () {
      return this.rising ? 'rising' : 'falling'
    }
  }
}
</script>

<style scoped>

.data{
  width:65%;
  float:left;
  height:100%;
  position:relative;
}

.cash{
  bottom:0px;
  position:absolute;
}
.change.rising{
  color:green;
}
.change.falling{
  color:red;
}
.change.rising:before{
  content: "\25b2";
}
.change.falling:before{
  content: "\25bc";
}
.indicator{
  float:right;
  width:35%;
  height:100%;
  position:relative;
}

h3{
  font-weight:400;
  margin: 0px;
}
.name{
  text-overflow: ellipsis;
  overflow:hidden;
  width: 250px;
  white-space: nowrap;
}


.high{
  top:0px;
  float:right;
}

.low{
  bottom:0px;
  position:absolute;
  /* float:right; */
  right:0px;
}
</style>
