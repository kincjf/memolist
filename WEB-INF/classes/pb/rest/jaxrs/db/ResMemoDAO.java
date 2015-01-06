package pb.rest.jaxrs.db;

import pb.rest.jaxrs.vo.MemoData;
public class ResMemoDAO extends MemoDAO<MemoData> {

	@Override
	protected void setObjectName() {
		if(objectName == null){
			objectName = "ResMemo";
		}
	}	
}
