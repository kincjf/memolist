package pb.rest.jaxrs.api;

import java.io.Serializable;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import pb.rest.jaxrs.db.ResMemoDAO;
import pb.rest.jaxrs.vo.MemoData;

@Path("/memo")
public class ResMemoResource implements Serializable {
	private static final long serialVersionUID = 7873330816524267933L;
	
	ResMemoDAO dao = new ResMemoDAO();

	@GET
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public List<MemoData> findAll() {
		return dao.findAll();
	}

	@GET @Path("search/{title}")
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public List<MemoData> findByTitle(@PathParam("title") String title){
		return dao.findByTitle(title);
	}

	@GET @Path("{_id}")
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public MemoData findById(@PathParam("_id") int _id){
		return dao.findById(_id);
	}

	@POST
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public MemoData create(MemoData memoData){
		return dao.create(memoData);
	}

	@PUT @Path("{_id}")
	@Consumes({ MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML })
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public MemoData update(MemoData memoData) {
		return dao.update(memoData);
	}

	@DELETE @Path("{_id}")
	@Produces({ MediaType.APPLICATION_JSON }) // MediaType.APPLICATION_XML,
	public void remove(@PathParam("_id") int _id){
		dao.remove(_id);
	}
}
