package pb.rest.jaxrs.db;

import java.io.IOException;
import java.io.Reader;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import pb.rest.jaxrs.vo.MemoData;

public class MemoDAO<T> implements SimpleDAO<T> {
	static String objectName = null;
	static SqlSessionFactory sqlMapper = null;
	SqlSession session = null;

	protected void init() {
		setObjectName();
		initMybatis();
	}
	
	protected void setObjectName(){
		if(objectName == null){
			objectName = "objectName";
		}
	}
	
	protected void initMybatis() {
		if (sqlMapper == null) {
			String resource = "pb/rest/mybatis/mybatisConf.xml";
			Reader reader;
			try {
				reader = Resources.getResourceAsReader(resource);
				sqlMapper = new SqlSessionFactoryBuilder().build(reader);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	public List<T> findAll() {
		List<T> result;
		
		init();
		session = sqlMapper.openSession();
		result = session.selectList(objectName+"Mapper.findAll");
		session.close();
		
		return result;
	}

	@SuppressWarnings("unchecked")
	public T findById(int _id) {
		T result;
		
		init();
		session = sqlMapper.openSession();
		result = (T) session.selectOne(objectName+"Mapper.findById", _id);
		session.close();
		
		return result;
	}

	public T create(T memoData) {
		init();
		session = sqlMapper.openSession(true);
		session.insert(objectName+"Mapper.create", memoData);
		//result = (Image)session.selectOne("ImageMapper.findByNotId", picture);
		session.close();
		
		return memoData;
	}

	public T update(T memoData) {
		init();
		session = sqlMapper.openSession(true);
		session.update(objectName+"Mapper.update", memoData);
		//result = (Image)session.selectOne("ImageMapper.findByNotId", picture);
		session.close();
		
		return memoData;
	}

	public void remove(int _id) {
		init();
		session = sqlMapper.openSession(true);
		session.delete(objectName+"Mapper.remove", _id);
		session.close();
	}
	
	public void removeAll() {
		init();
		session = sqlMapper.openSession(true);
		session.delete(objectName+"Mapper.removeAll");
		session.close();
	}
	
	@Override
	public List<T> findByTitle(String title) {
		List<T> result;
		
		init();
		session = sqlMapper.openSession();
		result = session.selectList(objectName+"Mapper.findByTitle", title);
		session.close();
		
		return result;
	}
}
