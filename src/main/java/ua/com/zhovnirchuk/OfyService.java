package ua.com.zhovnirchuk;

import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;

public class OfyService {
	
	static {
        factory().register(Recipe.class);
    }

    public static ObjectifyFactory factory() {
        return ObjectifyService.factory();
    }

    
    public static Objectify ofy() {
        return ObjectifyService.ofy();
    }
	
}
