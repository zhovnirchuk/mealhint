package ua.com.zhovnirchuk;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.google.api.server.spi.config.*;
import com.google.api.server.spi.config.ApiMethod.*;
import com.google.appengine.api.datastore.Query.Filter;
import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.cmd.Query;

@Api(name = "mealhintAPI", version = "v1", 
	scopes = { Constants.EMAIL_SCOPE },
	clientIds = { Constants.WEB_CLIENT_ID, Constants.API_EXPLORER_CLIENT_ID },
	description = "MealHint API")
public class MealHintAPI {

	private class MessageToUser implements Serializable {
		private String message;

		public MessageToUser() {
		}

		public MessageToUser(String message) {
			this.message = message;
		}

		public String getMessage() {
			return message;
		}

		public void setMessage(String message) {
			this.message = message;
		}
	}

	@ApiMethod(name = "addRecipe", path = "addRecipe", httpMethod = HttpMethod.POST)
	public void addRecipe(@Named("title") final String title,
			@Named("time") final int time,
			@Named("ingredients") final String ingredients,
			@Named("description") final String description) {
		Objectify ofy = OfyService.ofy();
		Recipe rec = new Recipe(title, time, ingredients, description);
		ofy.save().entity(rec).now();
	}

	@ApiMethod(name = "hasRecipe", path = "hasRecipe", httpMethod = HttpMethod.GET)
	public MessageToUser hasRecipe(@Named("title") final String title) {
		Key<Recipe> key = Key.create(Recipe.class, title);

		Recipe foo = OfyService.ofy().load().key(key).now();
		if (foo != null) {
			return new MessageToUser("1");
		}
		return new MessageToUser("0");
	}

	@ApiMethod(name = "getRecipes", path = "getRecipes", httpMethod = HttpMethod.POST)
	public List<Recipe> getRecipes(@Named("time") final String time,
			@Named("ingredients") final String ingredients) {

		List<Integer> times = new ArrayList<Integer>();
		if (time.charAt(0) == '1')
			times.add(1);
		if (time.charAt(1) == '1')
			times.add(2);
		if (time.charAt(2) == '1')
			times.add(3);
		
		List<String> ingrs = new ArrayList<String>();
		if (ingredients.charAt(0) == '1') {
			if (ingredients.charAt(1) == '1') {
				if (ingredients.charAt(2) == '1')
					ingrs.add("111");
				else
					ingrs.add("110");
			} else {
				if (ingredients.charAt(2) == '1')
					ingrs.add("101");
				else
					ingrs.add("100");
			}
		} else {
			if (ingredients.charAt(1) == '1') {
				if (ingredients.charAt(2) == '1')
					ingrs.add("011");
				else
					ingrs.add("010");
			} else {
				if (ingredients.charAt(2) == '1')
					ingrs.add("001");
				else
					ingrs.add("000");
			}
		}
		
		return OfyService.ofy().load().type(Recipe.class)
				.filter("time in", times).filter("ingredients in", ingrs).list();
	}

}
