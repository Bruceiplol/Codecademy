# app.param()

```js
app.param('spellId', (req, res, next, id) => {
  let spellId = Number(id);
    try {
      const found = SpellBook.find((spell) => {
        return spellId === spell.id;
      })
      if (found) {
        req.spell = found;
        next();
      } else {
        next(new Error('Your magic spell was not found in any of our tomes'));
      };
    } catch (err) {
      next(err)
    }
});
```
- intercept any request to a route handler with the `:spellId` parameter.
- `'spellId'` does not have the leading `:`.
- The actual ID will be passed in as the fourth argument, `id`

## Merge Parameters
- When we want to create something complex in software, we model out our base components and use composition to create these relationships.

```js
const sorcererRouter = express.Router();
const familiarRouter = express.Router({mergeParams: true});

sorcererRouter.use('/:sorcererId/familiars', familiarRouter);

sorcererRouter.get('/', (req, res, next) => {
  res.status(200).send(Sorcerers);
  next();
});

sorcererRouter.param('sorcererId', (req, res, next, id) => {
  const sorcerer = getSorcererById(id);   
  req.sorcerer = sorcerer;
  next();
});

familiarRouter.get('/', (req, res, next) => {
  res.status(200).send(`Sorcerer ${req.sorcerer} has familiars ${getFamiliars(sorcerer)}`);
});

app.use('/sorcerer', sorcererRouter);
```
- two endpoints: `/sorcerer` and `/sorcerer/:sorcererId/familiars`
- The familiars are nested into the sorcerer endpoint — indicating the relationship that a sorcerer has multiple familiars.
- `{mergeParameters: true}` tells Express that the `familiarRouter` should have access to parameters passed into its parent router, that is, the `sorcererRouter`
- We then tell express that the path for the `familiarRouter` is the same as the path for the `sorcererRouter` with the additional path `/:sorcererId/familiars`.
- We then can create a family of routes (a router) built by appending routes to `familiarRouter`‘s base: `/sorcerer/:sorcererId/familiars`.
