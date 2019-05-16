const adaptiveWizard = Machine(
  {
    id: "adaptiveWizard",
    initial: "undetermined",
    context: {
      variantChance: Math.random()
    },
    states: {
      undetermined: {
        on: {
          "": [
            { target: "variant1", cond: "isVariant1" },
            { target: "variant2", cond: "isVariant2" },
            { target: "variant3" }
          ]
        }
      },
      variant1: {
        initial: "thingA",
        states: {
          thingA: {
            on: {
              nextStep: "thingB"
            }
          },
          thingB: {
            on: {
              nextStep: "thingC"
            }
          },
          thingC: {
            on: {
              nextStep: "submitting"
            }
          },
          submitting: {
            onEntry: {
              action: "submitForm"
            },
            on: {
              success: "confirmation",
              error: "errored"
            }
          },
          confirmation: {},
          errored: {
            on: {
              retry: "submitting"
            }
          }
        }
      },
      variant2: {
        initial: "thingB",
        states: {
          thingB: {
            on: {
              nextStep: "thingC"
            }
          },
          thingC: {
            on: {
              nextStep: "thingA"
            }
          },
          thingA: {
            on: {
              nextStep: "submitting"
            }
          },
          submitting: {
            onEntry: {
              action: "submitForm"
            },
            on: {
              success: "confirmation",
              error: "errored"
            }
          },
          confirmation: {},
          errored: {
            on: {
              retry: "submitting"
            }
          }
        }
      },
      variant3: {
        initial: "thingC",
        states: {
          thingC: {
            on: {
              nextStep: "thingA"
            }
          },
          thingA: {
            on: {
              nextStep: "thingB"
            }
          },
          thingB: {
            on: {
              nextStep: "submitting"
            }
          },
          submitting: {
            onEntry: {
              action: "submitForm"
            },
            on: {
              success: "confirmation",
              error: "errored"
            }
          },
          confirmation: {},
          errored: {
            on: {
              retry: "submitting"
            }
          }
        }
      }
    }
  },
  {
    guards: {
      isVariant1: context => context.variantChance < 0.33,
      isVariant2: context =>
        context.variantChance > 0.33 && context.variantChance < 0.66
    }
  }
);
