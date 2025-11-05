import fetch from "node-fetch";
import xml2js from "xml2js";

export default async function handler(req, res) {
  const elevator_no = req.query.elevator_no;
  if (!elevator_no) return res.status(400).json({ error: "승강기 번호 필요" });

  const API_KEY = "ea2ab2e03de6ca2713e678cfffbd09fd304648d6d0be836d68705dbb975ed24f"; // 여기에 실제 서비스키 넣기
  const url = `http://openapi.elevator.go.kr/openapi/service/BuldElevatorService/getBuldElvtrList?serviceKey=${API_KEY}&elevator_no=${elevator_no}`;

  try {
    const response = await fetch(url);
    const xml = await response.text();

    xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      const items = result.response?.body?.items?.item;
      res.json({ items: items ? (Array.isArray(items) ? items : [items]) : [] });
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
