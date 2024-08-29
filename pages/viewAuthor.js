import clearDom from '../utils/clearDom';
import renderToDOM from '../utils/renderToDom';

const viewAuthor = (obj) => {
  clearDom();

  const domString = `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${obj.first_name} ${obj.last_name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${obj.email}</h6>
        <p class="card-text bold">${obj.favorite ? '<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Favorite</span>' : ''}</p>
        <hr>
        <i class="fas fa-edit btn btn-info" id="update-author-btn--${obj.firebaseKey}">Update</i>
        <i class="btn btn-danger fas fa-trash-alt" id="delete-author-btn--${obj.firebaseKey}">Delete</i>
      </div>
    </div>
    <div class="card">
        <img class="card-img-top" src=${obj.image} alt=${obj.title} style="height: 400px;">
        <div class="card-body" style="height: 180px;">
          <h5 class="card-title">${obj.title}</h5>
            <p class="card-text bold">${obj.sale ? `<span class="badge badge-info sale-badge"><i class="fa fa-bell" aria-hidden="true"></i> Sale</span> $${obj.price}` : `$${obj.price}`}</p>
            <hr>
            <i class="btn btn-success fas fa-eye" id="view-book-btn--${obj.firebaseKey}">View</i>
            <i id="edit-book-btn--${obj.firebaseKey}" class="fas fa-edit btn btn-info">Update</i>
            <i id="delete-book-btn--${obj.firebaseKey}" class="btn btn-danger fas fa-trash-alt">Delete</i>
        </div>
      </div>
    
    `;

  renderToDOM('#view', domString);
};

export default viewAuthor;
