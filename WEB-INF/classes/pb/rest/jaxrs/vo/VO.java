package pb.rest.jaxrs.vo;

import org.pojomatic.Pojomatic;
import org.pojomatic.annotations.AutoProperty;

@AutoProperty
public class VO {
	public int _id;
	
	@Override public String toString(){
		return Pojomatic.toString(this);
	}
}
