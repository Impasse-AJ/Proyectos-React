export default function ListadoPosts({ posts, onEliminar }) {
  // Si no hay resultados (por filtros o porque están vacíos), mostramos un mensaje simple
  if (!posts || posts.length === 0) {
    return (
      <section className="card">
        <h2 className="sectionTitle">Listado de Posts</h2>
        <p className="hint">No hay posts para mostrar con los filtros actuales.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="listHeader">
        <h2 className="sectionTitle">Listado de Posts</h2>
        <span className="badge">Total: {posts.length}</span>
      </div>

      <div className="posts">
        {posts.map((post) => (
          <article key={post.id} className="post">
            <div className="postTop">
              <div className="postMeta">
                <span className="pill">User: {post.userId}</span>
                <span className="pill">ID: {post.id}</span>

                {/* Indicador de post local (ampliación) */}
                {post.esLocal && <span className="pill pill-local">LOCAL</span>}
              </div>

              <button
                className="btn btn-danger"
                type="button"
                onClick={() => onEliminar(post)}
              >
                Eliminar
              </button>
            </div>

            <h3 className="postTitle">{post.title}</h3>
            <p className="postBody">{post.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
