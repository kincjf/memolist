package pb.rest.jaxrs.vo;

import org.pojomatic.annotations.AutoProperty;

@AutoProperty
public class MemoData extends VO {
	public int time;
	public String title;
	public String memoText;
	public String memoPicRawData;
}
