<template>
  <v-app id="inspire">
    <v-main class="white">
      <v-container>
       <br>

        <v-row>
          <v-col
            lg="4"
            md="4"
            sm="6"
            xs="12">
            <v-sheet rounded="lg">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      Grupos
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item-group
                v-model="model"
                mandatory
                color="#00CCB1">
                    <v-list-item
                    v-for="n in groups"
                    :key="n">
                      <v-btn @click="selectedGroup = n.name" text min-width="100%" mx-auto>
                        {{n.name}}
                      </v-btn>
                    </v-list-item>
                </v-list-item-group>
                <v-divider class="my-2"></v-divider>
              </v-list>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet
              height="500"
              rounded="lg"
              color="#00CCB1">
              <template v-slot>
                <span
                v-for="n in groups"
                :key="n">
                  <p v-if="n.name == selectedGroup">
                    <v-card
                      class="mx-auto"
                      max-width="700">
                      <v-card-title>
                        Nombre del grupo: {{n.name}}
                      </v-card-title>
                      <v-card-text class="text--primary">
                        Evento: {{n.eventID.name}}
                      </v-card-text>
                      <v-card-text class="text--primary">
                        Lider: {{n.userID[0].name}}
                      </v-card-text>
                      <v-card-text class="text--priary">
                        Miembros:
                      </v-card-text>
                      <v-card>
                        <v-list>
                          <v-list-item
                          v-for="i in n.userID"
                          :key="i"
                          class="px-12">
                            <v-list-item-title>
                              {{i.name}}
                            </v-list-item-title>

                            <v-list-item-action>
                              <v-btn @click="kickMember(i._id, n.leaderID, n.code)" fab x-small dark color="red">
                                <v-icon dark>
                                  mdi-minus
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                      </v-card>
                      <v-card-actions>
                        Código del grupo: {{n.code}}
                      </v-card-actions>
                    </v-card>
                  </p>
                </span>
              </template>
            </v-sheet>
          </v-col>
        </v-row>
        <v-container>
          <v-col lg="5">
            <v-form @submit.prevent="takeCode">
              <v-row :align="align" no-gutters>
                <v-text-field
                  v-model="code"
                  label="Código de invitación"
                  placeholder="Ingresar código"
                >

                </v-text-field>
                <v-btn color = "#00CCB1" type="submit" large outlined>
                  <v-icon>mdi-send</v-icon>
                </v-btn>
              </v-row>
            </v-form>
          </v-col>

        </v-container>
        <v-snackbar
          v-model="snackbar"
        >
          {{ text }}

          <template v-slot:action="{ attrs }">
            <v-btn
              color="#00CCB1"
              text
              v-bind="attrs"
              @click="snackbar = false"
            >
              Cerrar
            </v-btn>
          </template>
        </v-snackbar>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
    import API from '~/api';
    import {usuarioStore} from "../store/index.js"

    const user = usuarioStore()

    export default {
        data (){
            return {
              selectedGroup: "",
                groups:[

                ],
                code: '',
                snackbar:false,
                text:''
            }
        },
        methods:{
          takeCode(){
            const codigo = this.code
            console.log(codigo)
            if(this.code === ''){
              this.snackbar=true
              this.text = 'Escriba un código válido'
            }
          },

          async isLeader(id){
            try {
              const res = await API.isLeader(id)
              this.groups = res.data

            } catch (error) {
              console.log(error)
            }
          },

          async getGroupsUser(id){
            try {
              const res = await API.getGroupsUser(id)
              this.groups = res.data

            } catch (error) {
              console.log(error)
            }
          },

          async kickMember(id, leaderid, code){

            const req = {
              userID: id,
              leaderID: leaderid,
              code: code,
            }
            console.log(req);
            try {
              const res = await API.kickMember(req)
              this.group = res.data
              console.log()
            } catch (error) {
              console.log(error)
            }
          },
        }, beforeMount() {
            this.getGroupsUser(user.getUserId())
        }
  }
</script>
