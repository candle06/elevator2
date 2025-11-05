document.getElementById("searchBtn").addEventListener("click", async () => {
  const elevator_no = document.getElementById("elevator_no").value;
  if (!elevator_no) return alert("승강기 번호를 입력하세요.");

  try {
    const res = await fetch(`https://elevator2-steel.vercel.app.vercel.app/api/search?elevator_no=${elevator_no}`);
    const data = await res.json();

    const container = document.getElementById("results");
    container.innerHTML = "";

    if (!data.items || data.items.length === 0) {
      container.innerText = "검색 결과가 없습니다.";
      return;
    }

    data.items.forEach(item => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${item.BLD_NM || "건물명 없음"}</h3>
        <p>승강기 번호: ${item.ELEVATOR_NO || "-"}</p>
        <p>설치일: ${item.INSTL_DATE || "-"}</p>
        <p>제조사: ${item.MFR || "-"}</p>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    alert("검색 중 오류가 발생했습니다.");
    console.error(err);
  }
});
