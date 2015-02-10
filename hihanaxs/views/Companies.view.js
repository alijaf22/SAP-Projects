sap.ui.jsview("views.Companies", {

 

 

          /** Specifies the Controller belonging to this View.

          * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.

          * @memberOf views.Companies

          */

          getControllerName : function() {

                    return null;

          },

 

 

          /** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed.

          * Since the Controller is given to this method, its event handlers can be attached right away.

          * @memberOf views.Companies

          */

          createContent : function(oController) {

 

                    var topSalesCompanyBarChart = new sap.viz.ui5.Bar("topSalesCompanyBarChart", {

                              width : "50%",

                              height : "50%",

                              xAxis: {

                                        title: { visible: true, text : "EUR" }

                              },

                              title : {

                                        visible : true,

                                        text : 'Top Ten Companies by Sales Orders Volume'

                              }

                              ,

                              interaction: new sap.viz.ui5.types.controller.Interaction(

                                                                      {

                                                                                selectability: new sap.viz.ui5.types.controller.Interaction_selectability(

                                                                                                    {

                                                                       mode: sap.viz.ui5.types.controller.Interaction_selectability_mode.single

                                                                })

                                                                      }),

 

                              dataset : topSalesDataset = new sap.viz.ui5.data.FlattenedDataset({

                                        // a Bar Chart requires exactly one dimension (x-axis)

                                        dimensions : [ {

                                                  axis : 1, // must be one for the x-axis, 2 for y-axis

                                                  name : 'Company',

                                                  value : "{company_name}"

                                        }],

                                        // it can show multiple measures, each results in a new set of bars

                                        // in a new color

                                        measures : [

                                        {

                                                  name : 'Gross Amount', // 'name' is used as label in the Legend

                                                  value : '{gross_amount}' // 'value' defines the binding for the

                                        },

                                        {

                                                  name : 'Net Amount', // 'name' is used as label in the Legend

                                                  value : '{net_amount}' // 'value' defines the binding for the

                                        }

                                        ],

                                        // 'data' is used to bind the whole data collection that is to be

                                        // displayed in the chart

                                        data : {

                                                  path : "/"

                                        }

                              })

                    });

 

                    var salesModel = new sap.ui.model.json.JSONModel();

                    salesModel.loadData("services/salesOrderService.xsjs");

 

                    topSalesCompanyBarChart.setModel(salesModel);

 

                    return topSalesCompanyBarChart;

}

});