<template>
  <v-app style="
    background: #ffffff;">
    <v-main>

      <div class="container">

        <h2 class="text-h4 text-sm-h4 font-weight-black mb-4">
        <br>
         Eventos próximos:
        </h2>

        <v-row >

          <v-col
            v-for="n in events" :key="n"
            lg="4"
            md="4"
            sm="6"
            xs="12"
          >
            <v-card>
              <v-img
                :src="n.coverUrl"
                height="200px"
              >
                <v-card-title><p class="textBorder">{{n.name}}</p></v-card-title>
              </v-img>
              <v-card-subtitle class="pb-0">
                <p>Location: {{n.location}}</p>
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <p>Date start: {{n.dateStart.slice(0,10)}}</p>
                <p>Date finish: {{n.dateFinish.slice(0,10)}}</p>
              </v-card-text>
              <v-card-actions>
                <nuxt-link to="/infoEvent">
                  <v-btn  @click="selectEvent(n._id)" color=#009a82 class="white--text">
                    More info
                  </v-btn>
                </nuxt-link>
               
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-main>
  </v-app>
</template>

<script>

  import {eventStore} from "../store/index.js"

  const eventoStore = eventStore()

  import API from '~/api';
  export default {
    data (){
      return {
        events: [
        ]
      }
    },
    methods:{
      async getAllEvents(){
        try {
          const res = await API.getAllEvents()
          this.events = res.data
          
        } catch (error) {
          console.log(error)
        }
      },
      selectEvent(eventId){
        
        eventoStore.setEvent(eventId)
        console.log(eventoStore.selectEvent)


      }
    }, beforeMount() {
        this.getAllEvents()
        
    }
  }
</script>

<style scoped>

.container{
  text-align: center;
  padding: 3% 1% 1% 1%;
}
  .textBorder{
    text-shadow: 2px 0 0 rgb(0, 0, 0), -2px 0 0 rgb(0, 0, 0), 0 2px 0 rgb(0, 0, 0), 0 -2px 0 rgb(0, 0, 0), 1px 1px rgb(0, 0, 0), -1px -1px rgb(0, 0, 0), 1px -1px 0 rgb(0, 0, 0), -1px 1px 0 rgb(0, 0, 0);
    color: #fff
  }
</style>
