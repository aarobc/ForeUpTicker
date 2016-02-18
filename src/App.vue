<template>
  <div id="app">
    <h3>Stock Watcher</h3>
    <div class="search">
      <form v-on:submit.prevent="searchStock">
        <input type='text' v-model="query"
        ></input>
        <input type='button' value='ADD' v-on:click="searchStock"></input>
      </form>
    </div>
    <div class='stocks'>
        <stock-item class="stock" v-for="stock in stocks" :stock="stock"></stock-item>
    </div>
  </div>
</template>

<script>
import stockItem from './components/stockItem'

export default {
  data () {
    return {
      url: 'https://query.yahooapis.com/v1/public/yql',
      stocks: [],
      query: '',
      qDat: {
        q: '',
        format: 'json',
        env: 'store://datatables.org/alltableswithkeys',
        callback: ''
      }
    }
  },
  components: {
    stockItem
  },
  methods: {
    searchStock () {
      this.qDat.q = `SELECT * FROM yahoo.finance.quote WHERE symbol = '${this.query}'`
      console.log(this.qDat)

      this.$http.get(this.url, this.qDat).then((dat) => {
        // clear out the text field
        this.query = ''
        this.stocks.push(dat.data.query.results.quote)
      })
    },
    rm (stock) {
      console.log(stock)
    }
  }
}
</script>
<style>
body {
  font-family: 'Droid Serif';
  background-color:#F0F0F0;
}

#app{
  /* margin: 0 auto; */
  /* text-align:center; */
  width:100%;
}

.stocks{
  width: 100%;
}

.stock{
  height:10em;
  width:20em;
  background-color:white;
  padding:1em;
  margin: 1em;
  float:left;
}

form{
  width:18em;
  height:2em;
  position:relative;
}

input[type='text']{
  height:100%;
  float:left;
  /* position:absolute; */
}
input[type='button']{
  box-shadow: rgb(154, 204, 133) 0px 1px 0px 0px inset;
  border: 1px solid rgb(59, 110, 34);
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  background: linear-gradient(rgb(116, 173, 90) 5%, rgb(104, 165, 75) 100%) rgb(116, 173, 90);
  color:white;
  height:100%;
  float:right;
  width:7em;
}
</style>
