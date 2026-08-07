import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("imports every property in the original route order", async () => {
  const properties = JSON.parse(
    await readFile(new URL("../db/inspection-seed.json", import.meta.url), "utf8"),
  );

  assert.equal(properties.length, 184);
  assert.deepEqual(
    properties.map((property) => property.routeOrder),
    Array.from({ length: 184 }, (_, index) => index + 1),
  );
  assert.deepEqual(
    Object.fromEntries(
      ["中", "东", "南", "南南", "西", "北"].map((region) => [
        region,
        properties.filter((property) => property.region === region).length,
      ]),
    ),
    { 中: 49, 东: 17, 南: 51, 南南: 19, 西: 28, 北: 20 },
  );
});

test("keeps the planner focused on scheduling, completion, and rescheduling", async () => {
  const [planner, api, schema] = await Promise.all([
    readFile(new URL("../app/inspection/InspectionPlanner.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/inspection/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../db/schema.ts", import.meta.url), "utf8"),
  ]);

  assert.match(planner, /下周安排/);
  assert.match(planner, /所有房源/);
  assert.match(planner, /历史记录/);
  assert.match(planner, /加入安排/);
  assert.match(planner, /完成 inspection/);
  assert.match(planner, /重新预约/);
  assert.doesNotMatch(planner, /负责人/);

  assert.match(api, /action === "schedule"/);
  assert.match(api, /action === "complete"/);
  assert.match(api, /action === "reschedule"/);
  assert.match(api, /next_inspection_date = \?/);
  assert.match(schema, /properties_route_order_idx/);
  assert.match(schema, /inspections_planned_date_idx/);
});
