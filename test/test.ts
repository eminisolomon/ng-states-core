import assert from "assert";
import {
  all,
  states,
  senatorial_districts,
  lgas,
  State,
  StateData,
} from "../dist/index";
import statesAndLocalGov from "../src/statesAndLocalGov.json";

describe("naija-state-local-gov", function () {
  it("#all()", function () {
    const response: State[] = all();

    assert.equal(response.length, 37);
    assert.equal(typeof response, typeof []);
    assert.equal(response[1].state, statesAndLocalGov[1].state);
    assert.equal(response[1].lgas.length, statesAndLocalGov[1].lgas.length);
  });

  it("#states()", function () {
    const response: string[] = states();

    assert.equal(response.length, 37);
    assert.equal(typeof response, typeof []);
    assert.equal(response[1], statesAndLocalGov[1].state);
    assert.equal(response[36], "Zamfara");
  });

  it("#senatorial_districts()", function () {
    const response: string[] = senatorial_districts("Lagos");

    assert.equal(response.length, 3);
  });

  it("#lgas()", function () {
    const response: StateData = lgas("Lagos");

    assert.equal(response.state, "Lagos");
    assert.equal(response.lgas.length, 21);
  });
});
