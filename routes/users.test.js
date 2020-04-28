const request = require("supertest");
const app = require("../server");

test('usuarios', async()=>{
    jest.setTimeout(60000);
   const resp = await request(app)
                    .get('/usuarios')
                    .expect(200)

    console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(Array.isArray(resp.body)).toBe(true);

},60000)

test('profesionistas', async()=>{
    jest.setTimeout(60000);
   const resp = await request(app)
                    .get('/profesionistas')
                    .expect(200)

    console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(Array.isArray(resp.body)).toBe(true);

},60000)

test('servicios', async()=>{
    jest.setTimeout(60000);
   const resp = await request(app)
                    .get('/servicios')
                    .expect(200)

    console.log(resp.body);
    expect(resp.body).toBeTruthy();
    expect(Array.isArray(resp.body)).toBe(true);

},60000)


