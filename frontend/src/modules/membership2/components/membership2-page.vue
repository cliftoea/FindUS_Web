<template>
  <div>
    <h2>Upgrade your membership</h2>
    <h1>You are currently a <span style="color:darkgreen;">tier 1</span> user</h1>
    <el-row :gutter="16">
      <el-col :lg="8" :md="12" :sm="24">
        <p style='margin-left: 1em;margin-right: 1em;'>We can get further information on your reach including post views, time trends, and messenger requests</p>
      </el-col>
      <br>
      <el-col :lg="8" :md="12" :sm="24">
        <button style="margin-left: auto;margin-right: auto;width: 100%;background-color: #8e58da;margin-top: 1em;color: white;border: none;height: 2em;border-radius: 1em;">UPGRADE</button>
      </el-col>
      <br>
      <el-col :lg="8" :md="12" :sm="24">
        <p style='margin-left: 1em;margin-right: 1em;'>You will be able to utilize all of our mail features</p>
      </el-col>

    </el-row>

    
  </div>
</template>

<script>
import { i18n } from '@/i18n';
import HomeChart from '@/modules/home/components/home-chart.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'app-membership2-page',

  components: {
    [HomeChart.name]: HomeChart,
  },

  created() {
    if (this.isMobile) {
      this.collapseMenu();
    }
  },

  data() {
    return {
      bar: {
        type: "bar",
        data: {
          labels: [
            `${i18n("home.charts.day")} 1`,
            `${i18n("home.charts.day")} 2`,
            `${i18n("home.charts.day")} 3`,
            `${i18n("home.charts.day")} 4`,
            `${i18n("home.charts.day")} 5`
          ],
          datasets: [
            {
              label: i18n("Post Interaction (Facebook)"),
              backgroundColor: "rgba(45, 109, 247,0.2)",
              borderColor: "rgba(45, 109, 247,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(45, 109, 247,0.4)",
              hoverBorderColor: "rgba(45, 109, 247,1)",
              data: [65, 59, 80, 81, 82]
            }
          ]
        },
        
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      },
       bar3: {
        type: "bar",
        data: {
          labels: [
            `${i18n("home.charts.day")} 1`,
            `${i18n("home.charts.day")} 2`,
            `${i18n("home.charts.day")} 3`,
            `${i18n("home.charts.day")} 4`,
            `${i18n("home.charts.day")} 5`
          ],
          datasets: [
            {
              label: i18n("Post Interaction (LinkedIn) Coming Soon"),
              backgroundColor: "rgba(14, 120, 0,0.2)",
              borderColor: "rgba(14, 120, 0,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(14, 120, 0,0.4)",
              hoverBorderColor: "rgba(14, 120, 0,1)",
              data: [0, 0, 0, 0, 0]
            }
          ]
        },
        
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      },
      bar2: {
        type: "bar",
        data: {
          labels: [
            `${i18n("home.charts.day")} 1`,
            `${i18n("home.charts.day")} 2`,
            `${i18n("home.charts.day")} 3`,
            `${i18n("home.charts.day")} 4`,
            `${i18n("home.charts.day")} 5`
          ],
          datasets: [
            {
              label: i18n("Post Interaction (Twitter)"),
              backgroundColor: "rgba(87, 206, 242,0.2)",
              borderColor: "rgba(87, 206, 242,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(87, 206, 242,0.4)",
              hoverBorderColor: "rgba(87, 206, 242,1)",
              data: [45, 29, 40, 61, 32]
            }
          ]
        },
        
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        }
      },
      mix2: {
        type: "bar",
        options: {
          responsive: true,
          tooltips: {
            mode: "label"
          },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                type: "linear",
                display: false,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                }
              },
              {
                type: "linear",
                display: true,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  display: false
                }
              }
            ]
          }
        },
        data: {
          labels: [
            i18n("home.charts.months.1"),
            i18n("home.charts.months.2"),
            i18n("home.charts.months.3"),
            i18n("home.charts.months.4"),
            i18n("home.charts.months.5"),
            i18n("home.charts.months.6"),
            i18n("home.charts.months.7")
          ],
          datasets: [
            {
              label: i18n("home.charts.orange"),
              type: "line",
              data: [51, 65, 40, 49, 60, 37, 40],
              fill: false,
              borderColor: "#EC932F",
              backgroundColor: "#EC932F",
              pointBorderColor: "#EC932F",
              pointBackgroundColor: "#EC932F",
              pointHoverBackgroundColor: "#EC932F",
              pointHoverBorderColor: "#EC932F",
              yAxisID: "y-axis-2"
            },
            {
              type: "line",
              label: i18n("home.charts.blue"),
              data: [200, 185, 590, 621, 250, 400, 95],
              fill: false,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              hoverBackgroundColor: "#36A2EB",
              hoverBorderColor: "#36A2EB",
              yAxisID: "y-axis-1"
            }
          ]
        }
      },

      doughnut: {
        type: "doughnut",
        data: {
          labels: [
            i18n("home.charts.red"),
            i18n("home.charts.blue"),
            i18n("home.charts.yellow")
          ],
          datasets: [
            {
              data: [300, 50, 100],
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
            }
          ]
        }
      },

      mix1: {
        type: "bar",
        options: {
          responsive: true,
          tooltips: {
            mode: "label"
          },
          elements: {
            line: {
              fill: false
            }
          },
          scales: {
            xAxes: [
              {
                display: false,
                gridLines: {
                  display: false
                }
              }
            ],
            yAxes: [
              {
                type: "linear",
                display: false,
                position: "left",
                id: "y-axis-1",
                gridLines: {
                  display: false
                }
              },
              {
                type: "linear",
                display: false,
                position: "right",
                id: "y-axis-2",
                gridLines: {
                  display: false
                }
              }
            ]
          }
        },

        data: {
          labels: [
            i18n("home.charts.months.1"),
            i18n("home.charts.months.2"),
            i18n("home.charts.months.3"),
            i18n("home.charts.months.4"),
            i18n("home.charts.months.5"),
            i18n("home.charts.months.6"),
            i18n("home.charts.months.7")
          ],
          datasets: [
            {
              label: i18n("home.charts.orange"),
              type: "line",
              data: [51, 65, 40, 49, 60, 37, 40],
              fill: false,
              borderColor: "#EC932F",
              backgroundColor: "#EC932F",
              pointBorderColor: "#EC932F",
              pointBackgroundColor: "#EC932F",
              pointHoverBackgroundColor: "#EC932F",
              pointHoverBorderColor: "#EC932F",
              yAxisID: "y-axis-2"
            },
            {
              type: "bar",
              label: i18n("home.charts.blue"),
              data: [200, 185, 590, 621, 250, 400, 95],
              fill: false,
              backgroundColor: "#36A2EB",
              borderColor: "#36A2EB",
              hoverBackgroundColor: "#36A2EB",
              hoverBorderColor: "#36A2EB",
              yAxisID: "y-axis-1"
            }
          ]
        }
      },

      radar: {
        type: "radar",
        options: {
          scale: {
            display: false
          }
        },
        data: {
          labels: [
            i18n("home.charts.eating"),
            i18n("home.charts.drinking"),
            i18n("home.charts.sleeping"),
            i18n("home.charts.designing"),
            i18n("home.charts.coding"),
            i18n("home.charts.cycling"),
            i18n("home.charts.running")
          ],
          datasets: [
            {
              label: `${i18n("home.charts.grey")}`,
              backgroundColor: "rgba(179,181,198,0.2)",
              borderColor: "rgba(179,181,198,1)",
              pointBackgroundColor: "rgba(179,181,198,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(179,181,198,1)",
              data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
              label: `${i18n("home.charts.red")}`,
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              pointBackgroundColor: "rgba(255,99,132,1)",
              pointBorderColor: "#fff",
              pointHoverBackgroundColor: "#fff",
              pointHoverBorderColor: "rgba(255,99,132,1)",
              data: [28, 48, 40, 19, 96, 27, 100]
            }
          ]
        }
      },

      horizontalBar: {
        type: "bar",
        options: {
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        },
        data: {
          labels: [
            i18n("home.charts.months.1"),
            i18n("home.charts.months.2"),
            i18n("home.charts.months.3"),
            i18n("home.charts.months.4"),
            i18n("home.charts.months.5"),
            i18n("home.charts.months.6")
          ],
          datasets: [
            {
              label: i18n("home.charts.red"),
              backgroundColor: "rgba(255,99,132,0.2)",
              borderColor: "rgba(255,99,132,1)",
              borderWidth: 1,
              hoverBackgroundColor: "rgba(255,99,132,0.4)",
              hoverBorderColor: "rgba(255,99,132,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
        }
      },

      polar: {
        type: "polarArea",
        data: {
          datasets: [
            {
              data: [11, 16, 7, 3, 14],
              backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB"
              ]
            }
          ],
          labels: [
            i18n("home.charts.red"),
            i18n("home.charts.green"),
            i18n("home.charts.yellow"),
            i18n("home.charts.grey"),
            i18n("home.charts.blue")
          ]
        }
      },

      line: {
        type: "line",
        options: {
          scales: {
            xAxes: [
              {
                display: false
              }
            ],
            yAxes: [
              {
                display: true
              }
            ]
          }
        },
        data: {
          labels: [
            i18n("home.charts.months.1"),
            i18n("home.charts.months.2"),
            i18n("home.charts.months.3"),
            i18n("home.charts.months.4"),
            i18n("home.charts.months.5"),
            i18n("home.charts.months.6"),
            i18n("home.charts.months.7")
          ],
          datasets: [
            {
              label: i18n("home.charts.green"),
              fill: false,
              lineTension: 0.1,
              backgroundColor: "rgba(75,192,192,0.4)",
              borderColor: "rgba(75,192,192,1)",
              borderCapStyle: "butt",
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: "miter",
              pointBorderColor: "rgba(75,192,192,1)",
              pointBackgroundColor: "#fff",
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: "rgba(75,192,192,1)",
              pointHoverBorderColor: "rgba(220,220,220,1)",
              pointHoverBorderWidth: 2,
              pointRadius: 1,
              pointHitRadius: 10,
              data: [65, 59, 80, 81, 56, 55, 40]
            }
          ]
        }
      }
    }
  },

  computed: {
    ...mapGetters({
      isMobile: 'layout/isMobile',
    })
  },

  methods: {
    ...mapActions({
      collapseMenu: 'layout/collapseMenu',
    })
  }
};
</script>

<style scoped>
.el-col {
  margin-bottom: 16px;
}

.home-bottom-message {
  width: 100%;
  text-align: center;
  color: grey;
}
</style>
