window.onload = function() {
	var w = 900, h = 500 //same is doing two lines with semicolan

	var container = d3.select("body")
		.append("svg")
		.attr("width", w)
		.attr("height", h)
		.attr("class", "container")
		.style("background-color", "rgba(0,0,0,0.2)") //svg background color
        
	var innerRect = container.append("rect")
		.datum(400) //Rule: All data passed to the .data() operator must be formatted as an array.
        .attr("width", function(d) { //can be anything, calls data as parameter
        	return d * 2;
        })
        .attr("height", function(d){
        	return d
        })
        .attr("class", "innerRect")
        .attr("x", 50)
        .attr("y", 50)
        .style("fill", "#fff");
		
	
	var cityPop = [
		{
			city: 'Arrayville',
			population: 119438
		},
		{
			city: 'Functionville',
			population: 254310
		},
		{
			city: 'Dataville',
			population: 35428
		},
		{
			city: 'Deethreeville',
			population: 264282
		}
	];

	var minPop = d3.min(cityPop, function(d){
		return d.population;
	});

	var maxPop = d3.max(cityPop, function(d){
		return d.population;
	});


	var color = d3.scale.linear()
		.range([
			"#FDBE85",
			"#D94701"
		])
		.domain([
			minPop,
			maxPop
		]);
		console.log("are you working?")

	var x = d3.scale.linear()
		.range([90, 720])
		.domain([0, 3]);

	var y = d3.scale.linear()
		.range([450, 50])
		.domain([0, 300000]);

	var circles = container.selectAll(".circles")
			.data(cityPop)
			.enter()
			.append("circle")
			.attr("class" , "circles")
			.attr("id", function(d, i){
				console.log("d:", d, "i:", i);
				return d.city;
			})
			.attr("r", function(d){
				var area = d.population * 0.01;
				return Math.sqrt(area/Math.PI);
			})
			.attr("cx", function(d, i){
				return x(i);
			})
			.attr("cy", function(d){
				return y(d.population);
			})
			.style("fill", function(d, i){
				return color(d.population);
			})
			.style("stroke", "#000");

		var yAxis = d3.svg.axis()
			.scale(y)
			.orient("left")

		var axis = container.append("g")
			.attr("class", "axis")
			.attr("transform", "translate(50, 0)")
			.call(yAxis)

		var title = container.append("text")
			.attr("class", "title")
			.attr("text-anchor", "middle")
			.attr("x", 450)
			.attr("y", 30)
			.text("City Population");

		var labels = container.selectAll(".labels")
			.data(cityPop)
			.enter()
			.append("text")
			.attr("class", "labels")
			.attr("text-anchor", "left")
			.attr("y", function(d){
				return y(d.population) + 5;
			})

		var nameLine = labels.append("tspan")
			.attr("class", "nameLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.text(function(d){
				return d.city;
			});

		var format = d3.format(",");


		var popLine = labels.append("tspan")
			.attr("class", "popLine")
			.attr("x", function(d,i){
				return x(i) + Math.sqrt(d.population * 0.01 / Math.PI) + 5;
			})
			.attr("dy", "15")
			.text(function(d){
				return "Pop. " + format(d.population);
			});



}

