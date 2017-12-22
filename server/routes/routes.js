var axios = require('axios');
var async = require('async');
module.exports = function (app,stock) {

var path = process.cwd();
// function isLoggedIn (req, res, next) {
// 		if (req.isAuthenticated()) {
// 		  //console.log(req.isAuthenticated());
// 			return next();
// 		} else {
// 			res.redirect('/');
// 		}
// 	}
app.post("/api/add-stock", function (request, response) {
	let stockInput = request.body.stockInput;
	if (stockInput) {
	  stockInput = stockInput.toUpperCase();
	} else {
	  return response.status(400).json({msg:'Please insert a value!'});
	}
	console.log(request.body);
	stock.find({"stockSymbol": stockInput}).exec(function (err,results) {
  	if (err) throw err;
  	if (results.length > 0){
  	 // console.log(results)
  	  return response.status(400).json({msg:'OOPs stock already here!'});
  	}
  	else if (results.length >= 5) {
      return response.status(500).json({msg:'You cant add more than 5 stocks!'});
  	} else {
    	let apiUrl  = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ stockInput +'.json';
    	let now = new Date();
    	let year = now.getFullYear();
    	let month = now.getMonth() + 1;
    	let date = now.getDate();
    	axios({
            method: 'GET',
            url: apiUrl,
            params: {
              api_key: 'nXTC_hihQb_cBb4XxeWy',
              // collapse: 'monthly',
              order:'desc',
              start_date: (year-1) + '-' + month + '-' + date,
              end_date: year + '-' + month + '-' + date
            }
         })
          .then(function Success (res) {
            // console.log(res.data);
            
            let savedStock = {
            	stockSymbol: res.data.dataset.dataset_code,
        			stockData:	 res.data.dataset.data, // no need for it but maybe later.
        			quandlDBid:	 res.data.dataset.database_id
            };
            var new_stock = new stock(savedStock);
            new_stock.save(function (err,data) {
            	if (err) throw err;
                //Stock saved!
            		response.status(200).json(data);
            });
              
          })
          .catch(function(error) {
            console.log(error.response.data);
            // console.log('error');
            response.status(400).json({msg: 'Stock not found!'});
          });
  	    }
	});
});

app.get("/api/get-stocks", function (request, response) {
	let stocks=[];
	stock.find({}).exec(function (err,results) {
	    if(err) throw err;
	   console.log("fund all");
    // console.log(results);
    if(results){
      async.each(results, function(item,callback){
        
        let apiUrl  = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ item.stockSymbol +'.json';
        let now = new Date();
        let year = now.getFullYear();
        let month = now.getMonth() + 1;
        let date = now.getDate();
       
        axios({
              method: 'GET',
              url: apiUrl,
              params: {
                api_key: 'nXTC_hihQb_cBb4XxeWy',
                // collapse: 'monthly',
                order:'desc',
                start_date: (year-1) + '-' + month + '-' + date,
                end_date: year + '-' + month + '-' + date
              }
           })
            .then(function Success (res) {
              // console.log(res)
              stocks.push(res.data.dataset);
               callback();
            })
            .catch(function(error) {
              console.log(error.response.data);
              callback();
            });
       
      },function(err){
        if( err ) {
          // One of the iterations produced an error.
          // All processing will now stop.
          console.log('A file failed to process');
          response.status(500).json({error:err});
        } else {
          console.log('All files have been processed successfully');
          // console.log(stocks);
          response.status(200).json({results:stocks});
        }
      });
    }
	    
	});
});
app.post("/api/remove-stock", function (request, response) {
	let delStock = request.body.stockRemove;
// 	console.log(delStock)
	stock.deleteOne({ "stockSymbol" : delStock}, function (err){
          if (err) throw err;
          console.log("Deleted Successfull");
          response.status(200).json({massage:"Deleted Successfull"});
  });
});

app.get("/", function (request, response) {
  response.sendFile(path + '/client/index.html');
});


app.get('*', function(request, response) {
  response.sendFile(path + '/client/index.html');
});

};


////////// old ////////////
// app.post("/api/add-stock", function (request, response) {
// 	let stockInput = request.body.stockInput;
// 	console.log(request.body);
// 	let apiUrl  = 'https://www.quandl.com/api/v3/datasets/WIKI/'+ stockInput +'.json';
// 	let now = new Date();
// 	let year = now.getFullYear();
// 	let month = now.getMonth() + 1;
// 	let date = now.getDate();
// 	axios({
//         method: 'GET',
//         url: apiUrl,
//         params: {
//           api_key: 'nXTC_hihQb_cBb4XxeWy',
//           // collapse: 'monthly',
//           order:'desc',
//           start_date: (year-1) + '-' + month + '-' + date,
//           end_date: year + '-' + month + '-' + date
//         }
//     })
//       .then(function Success (res) {
//         // console.log(res.data);
        
//         let savedStock = {
//         	stockSymbol: res.data.dataset.dataset_code,
//     			stockData:	 res.data.dataset.data, // no need for it but maybe later.
//     			quandlDBid:	 res.data.dataset.database_id
//         };
//         var new_stock = new stock(savedStock);
//         new_stock.save(function (err,data) {
//         	if (err) throw err;
//             //Stock saved!
//         		response.status(200).json(data);
//         });
          
//       })
//       .catch(function(error) {
//       console.log(error.response.data);
//     // console.log('error');
//       response.status(400).json(error.response.data);
//       });
// });
