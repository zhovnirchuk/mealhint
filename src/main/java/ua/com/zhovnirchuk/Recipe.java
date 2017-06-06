package ua.com.zhovnirchuk;

import java.io.Serializable;

import com.googlecode.objectify.annotation.*;

@Entity
public class Recipe implements Serializable {
	
	@Id String title;
	@Index int time;
	@Index String ingredients;
	String description;
	
	Recipe(){
		
	}
	
	Recipe(String title, int time, String ingredients, String description){
		this.title = title;
		this.time = time;
		this.ingredients = ingredients;
		this.description = description;
	}
	
	public String getTitle(){
		return this.title;
	}
	
	public void setTitle(String t){
		this.title = t;
	}
	
	
	public int getTime(){
		return this.time;
	}
	
	public void setTime(int t){
		this.time = t;
	}
	
	
	public String getIngredients(){
		return this.ingredients;
	}
	
	public void setIngredients(String t){
		this.ingredients = t;
	}
	
	
	public String getDescription(){
		return this.description;
	}
	
	public void setDescription(String t){
		this.description = t;
	}
	
}
