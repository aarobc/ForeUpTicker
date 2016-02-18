<template>
  <div class="stock">
    <div class="data">
      <h3 class="name"> {{ stock.Name }}</h3>
      <span class="short-name">{{ stock.Symbol }}</span>
      <div class="sdat">
        <div class="change" :class="cClass">
          {{ stock.Change | change | round 2 }} ({{ pct | round 2 }}%)
        </div>
        <div class="cash">
          {{ stock.LastTradePriceOnly | round 2 | cash }}
        </div>
      </div>
    </div>
    <div class="indicator">

      <div class="triangle">
        <div :style="pctHeight">
          ►
        </div>
      </div>
      <div class="high">
        {{ stock.DaysHigh | round 2 | cash }}
      </div>
      <div class="low">
        {{ stock.DaysLow | round 2 | cash }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
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
      return parseFloat(val)
    },
    round (value, decimals) {
      if (!value) {
        value = 0
      }

      if (!decimals) {
        decimals = 0
      }

      value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals)
      return value
    },
    cash (val) {
      return `$${val}`
    }
  },
  computed: {
    cClass () {
      return this.rising() ? 'rising' : 'falling'
    },
    pct () {
      return parseFloat(this.stock.Change) / this.stock.DaysLow * 100
    },
    pctHeight () {
      var range = this.stock.DaysHigh - this.stock.DaysLow
      var diff = this.stock.LastTradePriceOnly - this.stock.DaysLow
        // this.stock.LastTradePriceOnly * 100
      // var pct = Math.abs(this.pct)
      var pct = (diff / range) * 100

      console.log(pct)
      // offset because weird css
      pct -= 4
      return {bottom: `${pct}%`}
    }
  },
  methods: {
    rising () {
      return this.stock.Change.indexOf('+') > -1
    }
  }
}
</script>

<style scoped>

.short-name{
  color: grey;
}
.triangle{
  height: 90%;
  float:left;
  width:10px;
  border-width:0px;
  border-right:2px;
  border-style:solid;
  position:relative;
}

.triangle>div{
  position:absolute;
}

.data{
  width:65%;
  float:left;
  height:100%;
  position:relative;
}

.sdat{
  bottom:0px;
  position:absolute;
}

.cash{
  font-size: 2em;
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
  color: grey;
  display:flex;
  align-items:center;
}

h3{
  font-weight:400;
  margin: 0px;
}
.name{
  text-overflow: ellipsis;
  overflow:hidden;
  width: 200px;
  white-space: nowrap;
}


.high{
  top:0px;
  float:right;
  right:0px;
  position:absolute;
}

.low{
  bottom:0px;
  position:absolute;
  /* float:right; */
  right:0px;
}
</style>
