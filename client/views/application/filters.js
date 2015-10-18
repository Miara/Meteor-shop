Template.filters.events({
	'click .filter-buttons .advanced' : function(){

	},
	'click .filter-buttons .apply' : function(){
		var sortValue = $("select[name='sort']").val();
		sortCriteria = {};
		priceCriteria = { $exists: true };
		if(sortValue == 'price-asc')
			sortCriteria = {'price': 1};
		else if(sortValue == 'price-desc')
			sortCriteria = {'price': -1};
		else if(sortValue == 'name-asc')
			sortCriteria = {'name': 1};
		else if(sortValue == 'name-desc')
			sortCriteria = {'name': -1};
		
		var priceFrom = $("input[name='priceFrom']").val();
		var priceTo = $("input[name='priceTo']").val();

		var searchFrom = {};
		var searchTo = {};
		if( priceFrom != "" && priceTo != ""){
			priceFrom = parseFloat(priceFrom);
			priceTo = parseFloat(priceTo);
			if(priceFrom > priceTo){
				//TODO: oibsluga bledu
			}else{
				priceCriteria ={$gte: priceFrom, $lte: priceTo};
			}
		}else if(priceFrom != ""){
			priceFrom = parseFloat(priceFrom);
			priceCriteria ={$gte: priceFrom};
		}else if(priceTo != ""){
			priceTo = parseFloat(priceTo);
			priceCriteria ={$lte: priceTo};
		}

		console.log(priceCriteria);
		_searchDeps.changed();
	}
});

//TODO : po przeladowaniu strony wartosci dalej maja byc w formularzu
// na enter przeladowanie formularza