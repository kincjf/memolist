package pb.rest.jaxrs.db;

import java.util.List;

public interface SimpleDAO<T> {

	public List<T> findAll();

	public T findById(int id);

	public T create(T memoData);

	public T update(T memoData);

	public void remove(int id);

	public List<T> findByTitle(String title);

}
