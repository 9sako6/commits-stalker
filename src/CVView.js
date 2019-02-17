class CVView {

  showResponse(responseJSON) {
    var addElem = "";
    for (let commitInfo of responseJSON) {
      addElem += `<li class="commits-list-item">
      <div class="table-list-cell">
      <p class="commit-title">
      <a class="message" data-pjax="true" href="${commitInfo.html_url}" target="_blank">
      ${commitInfo.commit.message}
      </a>
      </p>
      </div>
      </li>`;
    }
    $("#show-window").children().remove();
    // add contents
    $("#show-window").append(addElem);
  }

  showCommitNum(commitNum) {
    if (commitNum) {
      const elem = `<span class="num text-emphasized">${commitNum}</span>commits`
      $("#commit-num").empty();
      $("#commit-num").append(elem);
    }
  }

  setPageForm(page) {
    $("#page-form").val(page);
  }

}