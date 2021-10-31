<template>
  <div class="container">
    <header class="header">Race Board</header>
    <b-form-group class="label mt-3" label="Select the category">
      <b-form-group>
        <template v-for="category in categories">
          <b-button
            :key="category.id"
            :class="category.value"
            @click="selected = category.value"
            >{{ category.text }}</b-button
          >
        </template>
      </b-form-group>
      <div class="view-label">
        You are currently viewing {{ selectedRace }}
      </div>
      <b-table
        v-if="tableItems"
        class="mt-3 race-table"
        striped
        hover
        :items="tableItems"
        :fields="fields"
      >
      </b-table>
    </b-form-group>
  </div>
</template>

<script>
  export default {
    name: 'RacingBoard',
    data () {
      return {
        selected: 'greyhoundRacing',
        categories: [
          {
            text: 'Greyhound racing',
            value: 'greyhoundRacing',
            id: '9daef0d7-bf3c-4f50-921d-8e818c60fe61'
          },
          {
            text: 'Harness racing',
            value: 'harnessRacing',
            id: '161d9be2-e909-4326-8c2c-35ed71fb460b'
          },
          {
            text: 'Horse racing',
            value: 'RacingBoard',
            id: '4a2788f8-e825-4d36-9894-efd4baf1cfae'
          }
        ],
        fields: ['meeting_name', 'race_number', 'count_down'],
        currentTimeInSeconds: null
      }
    },
    computed: {
      raceData () {
        return this.$store.state.FETCH_RACE_RESPONSE
      },
      selectedRace () {
        return this.categories.find(category => category.value === this.selected).text.toLowerCase()
      },
      raceByCategory () {
        if (!this.raceData) return
        const {
          data: { race_summaries }
        } = this.raceData
        const selectedCategoryId = this.categories.find(
          category => category.value === this.selected
        )?.id
        const raceByCategory = Object.values(race_summaries).filter(
          race => race.category_id === selectedCategoryId
        )
        return raceByCategory
      },
      tableItems () {
        return this.raceByCategory
          ?.filter(race => {
            return (
              this.currentTimeInSeconds -
                Number(race?.advertised_start?.seconds) <
              60
            )
          })
          ?.map(race => {
            const secondsUntilRaceStart = parseInt(
              Number(race?.advertised_start?.seconds) -
                this.currentTimeInSeconds
            )
            race.count_down = this.convertSecondsToHhMmSs(secondsUntilRaceStart)
            return race
          })
          ?.sort(
            (raceA, raceB) =>
              raceA?.advertised_start?.seconds -
              raceB?.advertised_start?.seconds
          )
      }
    },
    mounted () {
      this.$store.dispatch('fetchRaces')
      this.updateCurrentTime()
    },
    methods: {
      updateCurrentTime () {
        setInterval(() => {
          this.currentTimeInSeconds = Date.now() / 1000
        }, 1000)
      },
      convertSecondsToHhMmSs (seconds) {
        const date = new Date(null)
        const secondsInAbsoluteValue = Math.abs(seconds)
        date.setSeconds(secondsInAbsoluteValue)
        return seconds >= 0
          ? date.toISOString().substr(11, 8)
          : `Already started for ${secondsInAbsoluteValue} seconds`
      }
    }
  }
</script>

<style scoped>
.view-label {
  margin-top: 20px;
}
.btn {
  margin-right: 20px;
  border-radius: 25px;
}
</style>