import MockAdapter from 'axios-mock-adapter';
import MCSkinHistory, {
  type ServerProfile,
  type PlayerProfile,
  type Name,
  type SkinTexture,
  type CapeTexture,
  type ServerPlayerHistoryEntry,
  type SkinFile,
} from './mcskinhistory';

describe('MCSkinHistory Data API', () => {
  const mcskinhistory: MCSkinHistory = new MCSkinHistory('API_KEY');
  const mock = new MockAdapter(mcskinhistory.axios);

  it('should be able to get a player profile', async () => {
    mock.onGet('/mcskinhistory/player', { params: { id: 'Zeryther' } }).reply(200, {
      id: '73b417dcd1e645d8af06895eeb5222a5',
      idFormatted: '73b417dc-d1e6-45d8-af06-895eeb5222a5',
      username: 'Zeryther',
      detectionDate: '2016-04-25T21:45:06.000Z',
    });

    const player: PlayerProfile | null = await mcskinhistory.getPlayerProfile({ query: 'Zeryther' });

    expect(player).not.toBeNull();

    expect(player?.id).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(player?.idFormatted).toBe('73b417dc-d1e6-45d8-af06-895eeb5222a5');
    expect(player?.username).toBe('Zeryther');
    expect(player?.detectionDate).toBe('2016-04-25T21:45:06.000Z');
  });

  it('should return null if the player does not exist', async () => {
    mock.onGet('/mcskinhistory/player', { params: { id: 'NotARealPlayer' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const player: PlayerProfile | null = await mcskinhistory.getPlayerProfile({ query: 'NotARealPlayer' });

    expect(player).toBeNull();
  });

  it("should be able to get a player's name history", async () => {
    mock.onGet('/mcskinhistory/player/names', { params: { id: 'FutabaP5' } }).reply(200, [
      {
        name: 'SimonBecker',
      },
      {
        name: 'GigadriveGroup',
        changedToAt: 1430492552000,
      },
      {
        name: 'TheChestEU',
        changedToAt: 1433102127000,
      },
      {
        name: 'WrathOfDungeons',
        changedToAt: 1454913631000,
      },
      {
        name: 'NotZeryther',
        changedToAt: 1491912041000,
      },
      {
        name: 'Zeryther4',
        changedToAt: 1566337997000,
      },
      {
        name: 'FutabaP5',
        changedToAt: 1587276173000,
      },
    ]);

    const names: Name[] | null = await mcskinhistory.getPlayerNames({ query: 'FutabaP5' });

    expect(names).not.toBeNull();

    expect(names?.length).toBe(7);

    expect(names?.[0].name).toBe('SimonBecker');

    expect(names?.[1].name).toBe('GigadriveGroup');
    expect(names?.[1].changedToAt).toBe(1430492552000);

    expect(names?.[2].name).toBe('TheChestEU');
    expect(names?.[2].changedToAt).toBe(1433102127000);

    expect(names?.[3].name).toBe('WrathOfDungeons');
    expect(names?.[3].changedToAt).toBe(1454913631000);

    expect(names?.[4].name).toBe('NotZeryther');
    expect(names?.[4].changedToAt).toBe(1491912041000);

    expect(names?.[5].name).toBe('Zeryther4');
    expect(names?.[5].changedToAt).toBe(1566337997000);

    expect(names?.[6].name).toBe('FutabaP5');
    expect(names?.[6].changedToAt).toBe(1587276173000);
  });

  it("should return null if the player's name history does not exist", async () => {
    mock.onGet('/mcskinhistory/player/names', { params: { id: 'NotARealPlayer' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const names: Name[] | null = await mcskinhistory.getPlayerNames({ query: 'NotARealPlayer' });

    expect(names).toBeNull();
  });

  it('should be able to get the skins on a player profile', async () => {
    mock.onGet('/mcskinhistory/player/skins', { params: { id: 'Zeryther' } }).reply(200, [
      {
        id: 21002403,
        timeAdded: '2023-01-11T11:52:28.000Z',
        file: {
          id: 9516175,
          staticIdentifier: null,
          hash: 'd6dfa5b3e772219d4ce924e4b5959c960f4d955ccbf35c12c8c5ddccf463d7bc',
          url: 'http://textures.minecraft.net/texture/d6dfa5b3e772219d4ce924e4b5959c960f4d955ccbf35c12c8c5ddccf463d7bc',
          firstUser: '73b417dcd1e645d8af06895eeb5222a5',
          users: 1,
          type: 'SKIN',
          timeAdded: '2023-01-11T11:52:27.000Z',
          model: 'STEVE',
          images: {
            face: 'https://tx.mcskinhistory.net/skin/9516175/face.png',
            full: 'https://tx.mcskinhistory.net/skin/9516175/full.png',
          },
        },
      },
      {
        id: 17285636,
        timeAdded: '2022-10-25T14:48:13.000Z',
        file: {
          id: 7588696,
          staticIdentifier: null,
          hash: 'df8ed96c557d441a63e7b6a4a911ab84fa453b42fc2ae6b01c3e1b02e138168c',
          url: 'https://tx.mcskinhistory.net/skin/7588696/original.png',
          firstUser: 'ca3f3109e0a149df85b5a1d7c84a0438',
          users: 126,
          type: 'SKIN',
          timeAdded: '2021-08-15T01:56:41.000Z',
          model: 'ALEX',
          images: {
            face: 'https://tx.mcskinhistory.net/skin/7588696/face.png',
            full: 'https://tx.mcskinhistory.net/skin/7588696/full.png',
          },
        },
      },
    ]);

    const skins: SkinTexture[] | null = await mcskinhistory.getPlayerSkins({ query: 'Zeryther' });

    expect(skins).not.toBeNull();

    expect(skins?.length).toBe(2);

    expect(skins?.[0].id).toBe(21002403);
    expect(skins?.[0].timeAdded).toBe('2023-01-11T11:52:28.000Z');
    expect(skins?.[0].file.id).toBe(9516175);
    expect(skins?.[0].file.staticIdentifier).toBeNull();
    expect(skins?.[0].file.hash).toBe('d6dfa5b3e772219d4ce924e4b5959c960f4d955ccbf35c12c8c5ddccf463d7bc');
    expect(skins?.[0].file.url).toBe(
      'http://textures.minecraft.net/texture/d6dfa5b3e772219d4ce924e4b5959c960f4d955ccbf35c12c8c5ddccf463d7bc'
    );
    expect(skins?.[0].file.firstUser).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(skins?.[0].file.users).toBe(1);
    expect(skins?.[0].file.type).toBe('SKIN');
    expect(skins?.[0].file.timeAdded).toBe('2023-01-11T11:52:27.000Z');
    expect(skins?.[0].file.model).toBe('STEVE');
    expect(skins?.[0].file.images.face).toBe('https://tx.mcskinhistory.net/skin/9516175/face.png');
    expect(skins?.[0].file.images.full).toBe('https://tx.mcskinhistory.net/skin/9516175/full.png');

    expect(skins?.[1].id).toBe(17285636);
    expect(skins?.[1].timeAdded).toBe('2022-10-25T14:48:13.000Z');
    expect(skins?.[1].file.id).toBe(7588696);
    expect(skins?.[1].file.staticIdentifier).toBeNull();
    expect(skins?.[1].file.hash).toBe('df8ed96c557d441a63e7b6a4a911ab84fa453b42fc2ae6b01c3e1b02e138168c');
    expect(skins?.[1].file.url).toBe('https://tx.mcskinhistory.net/skin/7588696/original.png');
    expect(skins?.[1].file.firstUser).toBe('ca3f3109e0a149df85b5a1d7c84a0438');
    expect(skins?.[1].file.users).toBe(126);
    expect(skins?.[1].file.type).toBe('SKIN');
    expect(skins?.[1].file.timeAdded).toBe('2021-08-15T01:56:41.000Z');
    expect(skins?.[1].file.model).toBe('ALEX');
    expect(skins?.[1].file.images.face).toBe('https://tx.mcskinhistory.net/skin/7588696/face.png');
    expect(skins?.[1].file.images.full).toBe('https://tx.mcskinhistory.net/skin/7588696/full.png');
  });

  it('should return null for skins if the player does not exist', async () => {
    mock.onGet('/mcskinhistory/player/skins', { params: { id: 'NotARealPlayer' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const skins: SkinTexture[] | null = await mcskinhistory.getPlayerSkins({ query: 'NotARealPlayer' });

    expect(skins).toBeNull();
  });

  it('should be able to get the Mojang capes on a player profile', async () => {
    mock.onGet('/mcskinhistory/player/mojang-capes', { params: { id: 'Zeryther' } }).reply(200, [
      {
        id: 17475953,
        timeAdded: '2022-10-29T10:44:38.000Z',
        file: {
          id: 8917768,
          staticIdentifier: null,
          hash: 'f9a76537647989f9a0b6d001e320dac591c359e9e61a31f4ce11c88f207f0ad4',
          url: 'http://textures.minecraft.net/texture/f9a76537647989f9a0b6d001e320dac591c359e9e61a31f4ce11c88f207f0ad4',
          firstUser: '6b22d02793874215b4951a0ed9f634aa',
          users: 49109,
          type: 'CAPE_MOJANG',
          timeAdded: '2022-09-01T21:12:25.000Z',
          images: {
            cape: 'https://mcskinhistory.com/avatar/cape/8917768.png',
          },
        },
      },
      {
        id: 12226093,
        timeAdded: '2021-09-08T21:57:45.000Z',
        file: {
          id: 7259462,
          staticIdentifier: 'migrator',
          hash: '2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933',
          url: 'http://textures.minecraft.net/texture/2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933',
          firstUser: '539415b023674171ae8184ed368751e9',
          users: 1195763,
          type: 'CAPE_MOJANG',
          timeAdded: '2021-07-09T09:22:24.000Z',
          images: {
            cape: 'https://mcskinhistory.com/avatar/cape/7259462.png',
          },
        },
      },
    ]);

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerMojangCapes({ query: 'Zeryther' });

    expect(capes).not.toBeNull();

    expect(capes?.length).toBe(2);

    expect(capes?.[0].id).toBe(17475953);
    expect(capes?.[0].timeAdded).toBe('2022-10-29T10:44:38.000Z');
    expect(capes?.[0].file.id).toBe(8917768);
    expect(capes?.[0].file.staticIdentifier).toBeNull();
    expect(capes?.[0].file.hash).toBe('f9a76537647989f9a0b6d001e320dac591c359e9e61a31f4ce11c88f207f0ad4');
    expect(capes?.[0].file.url).toBe(
      'http://textures.minecraft.net/texture/f9a76537647989f9a0b6d001e320dac591c359e9e61a31f4ce11c88f207f0ad4'
    );
    expect(capes?.[0].file.firstUser).toBe('6b22d02793874215b4951a0ed9f634aa');
    expect(capes?.[0].file.users).toBe(49109);
    expect(capes?.[0].file.type).toBe('CAPE_MOJANG');
    expect(capes?.[0].file.timeAdded).toBe('2022-09-01T21:12:25.000Z');
    expect(capes?.[0].file.images.cape).toBe('https://mcskinhistory.com/avatar/cape/8917768.png');

    expect(capes?.[1].id).toBe(12226093);
    expect(capes?.[1].timeAdded).toBe('2021-09-08T21:57:45.000Z');
    expect(capes?.[1].file.id).toBe(7259462);
    expect(capes?.[1].file.staticIdentifier).toBe('migrator');
    expect(capes?.[1].file.hash).toBe('2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933');
    expect(capes?.[1].file.url).toBe(
      'http://textures.minecraft.net/texture/2340c0e03dd24a11b15a8b33c2a7e9e32abb2051b2481d0ba7defd635ca7a933'
    );
    expect(capes?.[1].file.firstUser).toBe('539415b023674171ae8184ed368751e9');
    expect(capes?.[1].file.users).toBe(1195763);
    expect(capes?.[1].file.type).toBe('CAPE_MOJANG');
    expect(capes?.[1].file.timeAdded).toBe('2021-07-09T09:22:24.000Z');
    expect(capes?.[1].file.images.cape).toBe('https://mcskinhistory.com/avatar/cape/7259462.png');
  });

  it('should return null for Mojang capes if the player does not exist', async () => {
    mock.onGet('/mcskinhistory/player/mojang-capes', { params: { id: 'Zeryther' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerMojangCapes({ query: 'Zeryther' });

    expect(capes).toBeNull();
  });

  it('should be able to get the Optifine capes on a player profile', async () => {
    mock.onGet('/mcskinhistory/player/optifine-capes', { params: { id: 'Zeryther' } }).reply(200, [
      {
        id: 8770870,
        timeAdded: '2021-04-23T06:29:28.000Z',
        file: {
          id: 6236125,
          staticIdentifier: null,
          hash: '209c583554a7fabe52360dca7dac0d48cc063034416bf46386de4429514da094',
          url: 'https://tx.mcskinhistory.net/cape_optifine/6236125/original.png',
          firstUser: '73b417dcd1e645d8af06895eeb5222a5',
          users: 1,
          type: 'CAPE_OPTIFINE',
          timeAdded: '2021-04-23T06:29:28.000Z',
          images: {
            cape: 'https://tx.mcskinhistory.net/cape_optifine/6236125/cape.png',
          },
        },
      },
      {
        id: 8634658,
        timeAdded: '2021-03-18T00:38:26.000Z',
        file: {
          id: 6168843,
          staticIdentifier: null,
          hash: 'f3dcc06099ac926b9e29c67600cf57052fcdabe5c397d0f4d250263d3916e7c3',
          url: 'https://tx.mcskinhistory.net/cape_optifine/6168843/original.png',
          firstUser: '73b417dcd1e645d8af06895eeb5222a5',
          users: 1,
          type: 'CAPE_OPTIFINE',
          timeAdded: '2021-03-18T00:38:26.000Z',
          images: {
            cape: 'https://tx.mcskinhistory.net/cape_optifine/6168843/cape.png',
          },
        },
      },
    ]);

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerOptifineCapes({ query: 'Zeryther' });

    expect(capes).not.toBeNull();

    expect(capes?.length).toBe(2);

    expect(capes?.[0].id).toBe(8770870);
    expect(capes?.[0].timeAdded).toBe('2021-04-23T06:29:28.000Z');
    expect(capes?.[0].file.id).toBe(6236125);
    expect(capes?.[0].file.staticIdentifier).toBeNull();
    expect(capes?.[0].file.hash).toBe('209c583554a7fabe52360dca7dac0d48cc063034416bf46386de4429514da094');
    expect(capes?.[0].file.url).toBe('https://tx.mcskinhistory.net/cape_optifine/6236125/original.png');
    expect(capes?.[0].file.firstUser).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(capes?.[0].file.users).toBe(1);
    expect(capes?.[0].file.type).toBe('CAPE_OPTIFINE');
    expect(capes?.[0].file.timeAdded).toBe('2021-04-23T06:29:28.000Z');
    expect(capes?.[0].file.images.cape).toBe('https://tx.mcskinhistory.net/cape_optifine/6236125/cape.png');

    expect(capes?.[1].id).toBe(8634658);
    expect(capes?.[1].timeAdded).toBe('2021-03-18T00:38:26.000Z');
    expect(capes?.[1].file.id).toBe(6168843);
    expect(capes?.[1].file.staticIdentifier).toBeNull();
    expect(capes?.[1].file.hash).toBe('f3dcc06099ac926b9e29c67600cf57052fcdabe5c397d0f4d250263d3916e7c3');
    expect(capes?.[1].file.url).toBe('https://tx.mcskinhistory.net/cape_optifine/6168843/original.png');
    expect(capes?.[1].file.firstUser).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(capes?.[1].file.users).toBe(1);
    expect(capes?.[1].file.type).toBe('CAPE_OPTIFINE');
    expect(capes?.[1].file.timeAdded).toBe('2021-03-18T00:38:26.000Z');
    expect(capes?.[1].file.images.cape).toBe('https://tx.mcskinhistory.net/cape_optifine/6168843/cape.png');
  });

  it('should return null for Optifine capes if the player does not exist', async () => {
    mock.onGet('/mcskinhistory/player/optifine-capes', { params: { id: 'Zeryther' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerOptifineCapes({ query: 'Zeryther' });

    expect(capes).toBeNull();
  });

  it('should be able to get the custom capes on a player profile', async () => {
    mock.onGet('/mcskinhistory/player/custom-capes', { params: { id: 'Zeryther' } }).reply(200, [
      {
        id: 3255103,
        timeAdded: '2019-09-23T22:55:36.000Z',
        file: {
          id: 3055973,
          staticIdentifier: null,
          hash: '7df6f1b919982eb5ccda87478367e08baf155547ca8b50172b0f1a5aa95bec51',
          url: 'https://tx.mcskinhistory.net/cape_labymod/3055973/original.png',
          firstUser: '73b417dcd1e645d8af06895eeb5222a5',
          users: 1,
          type: 'CAPE_LABYMOD',
          timeAdded: '2019-08-21T23:39:04.000Z',
          images: {
            cape: 'https://tx.mcskinhistory.net/cape_labymod/3055973/cape.png',
          },
        },
      },
      {
        id: 919,
        timeAdded: '2017-09-14T23:17:34.000Z',
        file: {
          id: 471075,
          staticIdentifier: null,
          hash: 'a81fe462037e230e99443f578510fff6a18cf046c7850921bf2a31c765466e52',
          url: 'https://tx.mcskinhistory.net/cape_labymod/471075/original.png',
          firstUser: '73b417dcd1e645d8af06895eeb5222a5',
          users: 1,
          type: 'CAPE_LABYMOD',
          timeAdded: '2017-09-14T23:17:34.000Z',
          images: {
            cape: 'https://tx.mcskinhistory.net/cape_labymod/471075/cape.png',
          },
        },
      },
    ]);

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerCustomCapes({ query: 'Zeryther' });

    expect(capes).not.toBeNull();

    expect(capes?.length).toBe(2);

    expect(capes?.[0].id).toBe(3255103);
    expect(capes?.[0].timeAdded).toBe('2019-09-23T22:55:36.000Z');
    expect(capes?.[0].file.id).toBe(3055973);
    expect(capes?.[0].file.staticIdentifier).toBeNull();
    expect(capes?.[0].file.hash).toBe('7df6f1b919982eb5ccda87478367e08baf155547ca8b50172b0f1a5aa95bec51');
    expect(capes?.[0].file.url).toBe('https://tx.mcskinhistory.net/cape_labymod/3055973/original.png');
    expect(capes?.[0].file.firstUser).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(capes?.[0].file.users).toBe(1);
    expect(capes?.[0].file.type).toBe('CAPE_LABYMOD');
    expect(capes?.[0].file.timeAdded).toBe('2019-08-21T23:39:04.000Z');
    expect(capes?.[0].file.images.cape).toBe('https://tx.mcskinhistory.net/cape_labymod/3055973/cape.png');

    expect(capes?.[1].id).toBe(919);
    expect(capes?.[1].timeAdded).toBe('2017-09-14T23:17:34.000Z');
    expect(capes?.[1].file.id).toBe(471075);
    expect(capes?.[1].file.staticIdentifier).toBeNull();
    expect(capes?.[1].file.hash).toBe('a81fe462037e230e99443f578510fff6a18cf046c7850921bf2a31c765466e52');
    expect(capes?.[1].file.url).toBe('https://tx.mcskinhistory.net/cape_labymod/471075/original.png');
    expect(capes?.[1].file.firstUser).toBe('73b417dcd1e645d8af06895eeb5222a5');
    expect(capes?.[1].file.users).toBe(1);
    expect(capes?.[1].file.type).toBe('CAPE_LABYMOD');
    expect(capes?.[1].file.timeAdded).toBe('2017-09-14T23:17:34.000Z');
    expect(capes?.[1].file.images.cape).toBe('https://tx.mcskinhistory.net/cape_labymod/471075/cape.png');
  });

  it('should return null for custom capes if the player does not exist', async () => {
    mock.onGet('/mcskinhistory/player/custom-capes', { params: { id: 'NotARealPlayer' } }).reply(404, {
      errors: [
        {
          message: 'Player not found',
        },
      ],
    });

    const capes: CapeTexture[] | null = await mcskinhistory.getPlayerCustomCapes({ query: 'NotARealPlayer' });

    expect(capes).toBeNull();
  });

  it('should be able to get a server profile', async () => {
    mock.onGet('/mcskinhistory/server', { params: { ip: 'mc.hypixel.net' } }).reply(200, {
      ip: 'hypixel.net',
      name: 'Hypixel Network',
      votes: 0,
      version: 'Requires MC 1.8 / 1.19',
      uptime: 99.88,
      lastPing: '2023-05-20T01:14:36.000Z',
      country: 'US',
      players: {
        online: 42092,
        max: 200000,
        peak: 193834,
      },
      images: {
        icon: 'https://mcskinhistory.com/avatar/server/hypixel.net.png',
        logo: 'https://static-cdn.gigadrivegroup.com/images/mcskinhistory/mcserver-assets/assets/hypixel/logo.png',
        background:
          'https://static-cdn.gigadrivegroup.com/images/mcskinhistory/mcserver-assets/assets/hypixel/background-big.png',
      },
      social: {
        website: 'https://hypixel.net',
        mcskinhistory: 'https://mcskinhistory.com/server/hypixel.net',
        twitter: 'https://twitter.com/HypixelNetwork',
        discordInvite: 'https://discord.gg/hypixel',
        discordId: null,
        teamspeak: null,
        youtube: 'https://www.youtube.com/https://www.youtube.com/channel/UCHoVdy7-tYfrZtfhnSDK3JA',
        tiktok: null,
        facebook: 'https://www.facebook.com/Hypixel',
        instagram: 'https://www.instagram.com/hypixelofficial',
        shop: 'https://store.hypixel.net',
        support: 'https://support.hypixel.net',
        youtubeVideo: 'https://www.youtube.com/watch?v=xVWLr-_V0x4',
      },
      motd: {
        raw: '                §aHypixel Network §c[1.8-1.19]\n       §6§lSKYBLOCK 0.18.4 §7- §b§lBED WARS UPDATE',
        html: '                <span style="color:#55FF55;">Hypixel Network </span><span style="color:#FF5555;">[1.8-1.19]<br/>       </span><span style="color:#FFAA00;font-weight: bold;">SKYBLOCK 0.18.4 </span><span style="color:#AAAAAA;font-weight: bold;">- </span><span style="color:#55FFFF;font-weight: bold;">BED WARS UPDATE</span>',
      },
      alternativeAddresses: [],
      categories: [
        'ADVENTURE',
        'BEDWARS',
        'DUNGEONS',
        'ECONOMY',
        'MINIGAMES',
        'NO_WHITELIST',
        'PARKOUR',
        'PETS',
        'PVP',
        'SKYBLOCK',
        'SKYWARS',
        'SPIGOT',
        'SURVIVAL',
        'SURVIVAL_GAMES',
        'TNT_RUN',
      ],
    });

    const server: ServerProfile | null = await mcskinhistory.getServerProfile({ ip: 'mc.hypixel.net' });

    expect(server).not.toBeNull();

    expect(server?.ip).toBe('hypixel.net');
    expect(server?.name).toBe('Hypixel Network');
    expect(server?.votes).toBe(0);
    expect(server?.version).toBe('Requires MC 1.8 / 1.19');
    expect(server?.uptime).toBe(99.88);
    expect(server?.lastPing).toBe('2023-05-20T01:14:36.000Z');
    expect(server?.country).toBe('US');
    expect(server?.players.online).toBe(42092);
    expect(server?.players.max).toBe(200000);
    expect(server?.players.peak).toBe(193834);

    expect(server?.images.icon).toBe('https://mcskinhistory.com/avatar/server/hypixel.net.png');
    expect(server?.images.logo).toBe(
      'https://static-cdn.gigadrivegroup.com/images/mcskinhistory/mcserver-assets/assets/hypixel/logo.png'
    );
    expect(server?.images.background).toBe(
      'https://static-cdn.gigadrivegroup.com/images/mcskinhistory/mcserver-assets/assets/hypixel/background-big.png'
    );

    expect(server?.social.website).toBe('https://hypixel.net');
    expect(server?.social.mcskinhistory).toBe('https://mcskinhistory.com/server/hypixel.net');
    expect(server?.social.twitter).toBe('https://twitter.com/HypixelNetwork');
    expect(server?.social.discordInvite).toBe('https://discord.gg/hypixel');
    expect(server?.social.discordId).toBeNull();
    expect(server?.social.teamspeak).toBeNull();
    expect(server?.social.youtube).toBe(
      'https://www.youtube.com/https://www.youtube.com/channel/UCHoVdy7-tYfrZtfhnSDK3JA'
    );
    expect(server?.social.tiktok).toBeNull();
    expect(server?.social.facebook).toBe('https://www.facebook.com/Hypixel');
    expect(server?.social.instagram).toBe('https://www.instagram.com/hypixelofficial');
    expect(server?.social.shop).toBe('https://store.hypixel.net');
    expect(server?.social.support).toBe('https://support.hypixel.net');
    expect(server?.social.youtubeVideo).toBe('https://www.youtube.com/watch?v=xVWLr-_V0x4');

    expect(server?.motd.raw).toBe(
      '                §aHypixel Network §c[1.8-1.19]\n       §6§lSKYBLOCK 0.18.4 §7- §b§lBED WARS UPDATE'
    );
    expect(server?.motd.html).toBe(
      '                <span style="color:#55FF55;">Hypixel Network </span><span style="color:#FF5555;">[1.8-1.19]<br/>       </span><span style="color:#FFAA00;font-weight: bold;">SKYBLOCK 0.18.4 </span><span style="color:#AAAAAA;font-weight: bold;">- </span><span style="color:#55FFFF;font-weight: bold;">BED WARS UPDATE</span>'
    );

    expect(server?.alternativeAddresses).toStrictEqual([]);

    expect(server?.categories).toStrictEqual([
      'ADVENTURE',
      'BEDWARS',
      'DUNGEONS',
      'ECONOMY',
      'MINIGAMES',
      'NO_WHITELIST',
      'PARKOUR',
      'PETS',
      'PVP',
      'SKYBLOCK',
      'SKYWARS',
      'SPIGOT',
      'SURVIVAL',
      'SURVIVAL_GAMES',
      'TNT_RUN',
    ]);
  });

  it('should return null if the server does not exist', async () => {
    mock.onGet('/mcskinhistory/server', { params: { ip: 'mc.hypixel.net' } }).reply(404, {
      errors: [
        {
          message: 'Server Not Found',
        },
      ],
    });

    const server: ServerProfile | null = await mcskinhistory.getServerProfile({ ip: 'mc.hypixel.net' });

    expect(server).toBeNull();
  });

  it('should be able to get the historical player count data of a server', async () => {
    mock
      .onGet('/mcskinhistory/server/player-history', {
        params: {
          ip: 'hypixel.net',
          rangeStart: '2022-12-11T20:00:00.000Z',
          rangeEnd: '2023-02-12T19:00:00.000Z',
        },
      })
      .reply(200, [
        {
          time: '2023-05-19 18:00:00.000000000',
          players: 51558,
        },
        {
          time: '2023-05-19 19:00:00.000000000',
          players: 53606,
        },
        {
          time: '2023-05-19 21:00:00.000000000',
          players: 48137,
        },
        {
          time: '2023-05-19 22:00:00.000000000',
          players: 46158,
        },
        {
          time: '2023-05-19 23:00:00.000000000',
          players: 43482,
        },
        {
          time: '2023-05-20 01:00:00.000000000',
          players: 42010,
        },
        {
          time: '2023-05-20 02:00:00.000000000',
          players: 41498,
        },
        {
          time: '2023-05-20 03:00:00.000000000',
          players: 39466,
        },
        {
          time: '2023-05-20 05:00:00.000000000',
          players: 35079,
        },
        {
          time: '2023-05-20 06:00:00.000000000',
          players: 33859,
        },
        {
          time: '2023-05-20 07:00:00.000000000',
          players: 35831,
        },
        {
          time: '2023-05-20 08:00:00.000000000',
          players: 36488,
        },
        {
          time: '2023-05-20 10:00:00.000000000',
          players: 42803,
        },
        {
          time: '2023-05-20 11:00:00.000000000',
          players: 46967,
        },
        {
          time: '2023-05-20 12:00:00.000000000',
          players: 50042,
        },
        {
          time: '2023-05-20 13:00:00.000000000',
          players: 51784,
        },
        {
          time: '2023-05-20 15:00:00.000000000',
          players: 58158,
        },
        {
          time: '2023-05-20 16:00:00.000000000',
          players: 60241,
        },
        {
          time: '2023-05-20 17:00:00.000000000',
          players: 61275,
        },
      ]);

    const playerHistory: ServerPlayerHistoryEntry[] = await mcskinhistory.getServerPlayerHistory({
      ip: 'hypixel.net',
      rangeStart: new Date('2022-12-11T20:00:00.000Z'),
      rangeEnd: new Date('2023-02-12T19:00:00.000Z'),
    });

    expect(playerHistory.length).toBe(19);

    expect(playerHistory[0].time).toBe('2023-05-19 18:00:00.000000000');
    expect(playerHistory[0].players).toBe(51558);

    expect(playerHistory[1].time).toBe('2023-05-19 19:00:00.000000000');
    expect(playerHistory[1].players).toBe(53606);

    expect(playerHistory[2].time).toBe('2023-05-19 21:00:00.000000000');
    expect(playerHistory[2].players).toBe(48137);

    expect(playerHistory[3].time).toBe('2023-05-19 22:00:00.000000000');
    expect(playerHistory[3].players).toBe(46158);
  });

  it('should be able to get the newest skins', async () => {
    mock.onGet('/mcskinhistory/skins', { params: { sort: 'new', limit: 3 } }).reply(200, [
      {
        id: 9791229,
        staticIdentifier: null,
        hash: '1dd2387dac383c587c278c225470900b132d707e8cc1a3c077e59cd8a58bce2c',
        url: 'http://textures.minecraft.net/texture/1dd2387dac383c587c278c225470900b132d707e8cc1a3c077e59cd8a58bce2c',
        firstUser: 'e52569309e874c5e96058207d6e327b5',
        users: 1,
        type: 'SKIN',
        timeAdded: '2023-05-16T23:11:03.000Z',
        model: 'STEVE',
        images: {
          face: 'https://mcskinhistory.com/avatar/skin/face/9791229.png',
          full: 'https://mcskinhistory.com/avatar/full/9791229.png',
        },
      },
      {
        id: 9791228,
        staticIdentifier: null,
        hash: '7c707580b32c7e7a16a7a48b8f76cf80d552e00c255f4998df2a59fd0e7244d1',
        url: 'http://textures.minecraft.net/texture/7c707580b32c7e7a16a7a48b8f76cf80d552e00c255f4998df2a59fd0e7244d1',
        firstUser: '657f3c47901e4e328183b76e8178b815',
        users: 1,
        type: 'SKIN',
        timeAdded: '2023-05-16T23:06:55.000Z',
        model: 'ALEX',
        images: {
          face: 'https://mcskinhistory.com/avatar/skin/face/9791228.png',
          full: 'https://mcskinhistory.com/avatar/full/9791228.png',
        },
      },
      {
        id: 9791227,
        staticIdentifier: null,
        hash: '96b9f86190de623c055a1f398c2d9da1b47675fa237b3abfa706fa21069c5d8d',
        url: 'http://textures.minecraft.net/texture/96b9f86190de623c055a1f398c2d9da1b47675fa237b3abfa706fa21069c5d8d',
        firstUser: '4374dcc31a1849f59e5675c8fc7ced45',
        users: 1,
        type: 'SKIN',
        timeAdded: '2023-05-16T23:03:57.000Z',
        model: 'ALEX',
        images: {
          face: 'https://mcskinhistory.com/avatar/skin/face/9791227.png',
          full: 'https://mcskinhistory.com/avatar/full/9791227.png',
        },
      },
    ]);

    const skins: SkinFile[] = await mcskinhistory.getSkinList({ sort: 'new', limit: 3 });

    expect(skins.length).toBe(3);

    expect(skins[0].id).toBe(9791229);
    expect(skins[0].hash).toBe('1dd2387dac383c587c278c225470900b132d707e8cc1a3c077e59cd8a58bce2c');
    expect(skins[0].url).toBe(
      'http://textures.minecraft.net/texture/1dd2387dac383c587c278c225470900b132d707e8cc1a3c077e59cd8a58bce2c'
    );
    expect(skins[0].firstUser).toBe('e52569309e874c5e96058207d6e327b5');
    expect(skins[0].users).toBe(1);
    expect(skins[0].type).toBe('SKIN');
    expect(skins[0].timeAdded).toBe('2023-05-16T23:11:03.000Z');
    expect(skins[0].model).toBe('STEVE');
    expect(skins[0].images.face).toBe('https://mcskinhistory.com/avatar/skin/face/9791229.png');
    expect(skins[0].images.full).toBe('https://mcskinhistory.com/avatar/full/9791229.png');

    expect(skins[1].id).toBe(9791228);
    expect(skins[1].hash).toBe('7c707580b32c7e7a16a7a48b8f76cf80d552e00c255f4998df2a59fd0e7244d1');
    expect(skins[1].url).toBe(
      'http://textures.minecraft.net/texture/7c707580b32c7e7a16a7a48b8f76cf80d552e00c255f4998df2a59fd0e7244d1'
    );
    expect(skins[1].firstUser).toBe('657f3c47901e4e328183b76e8178b815');
    expect(skins[1].users).toBe(1);
    expect(skins[1].type).toBe('SKIN');
    expect(skins[1].timeAdded).toBe('2023-05-16T23:06:55.000Z');
    expect(skins[1].model).toBe('ALEX');
    expect(skins[1].images.face).toBe('https://mcskinhistory.com/avatar/skin/face/9791228.png');
    expect(skins[1].images.full).toBe('https://mcskinhistory.com/avatar/full/9791228.png');

    expect(skins[2].id).toBe(9791227);
    expect(skins[2].hash).toBe('96b9f86190de623c055a1f398c2d9da1b47675fa237b3abfa706fa21069c5d8d');
    expect(skins[2].url).toBe(
      'http://textures.minecraft.net/texture/96b9f86190de623c055a1f398c2d9da1b47675fa237b3abfa706fa21069c5d8d'
    );
    expect(skins[2].firstUser).toBe('4374dcc31a1849f59e5675c8fc7ced45');
    expect(skins[2].users).toBe(1);
    expect(skins[2].type).toBe('SKIN');
    expect(skins[2].timeAdded).toBe('2023-05-16T23:03:57.000Z');
    expect(skins[2].model).toBe('ALEX');
    expect(skins[2].images.face).toBe('https://mcskinhistory.com/avatar/skin/face/9791227.png');
    expect(skins[2].images.full).toBe('https://mcskinhistory.com/avatar/full/9791227.png');
  });

  it('should be able to get the most popular skins', async () => {
    mock.onGet('/mcskinhistory/skins', { params: { sort: 'popular', limit: 3 } }).reply(200, [
      {
        id: 94,
        staticIdentifier: 'steve',
        hash: '1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b',
        url: 'http://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b',
        firstUser: '44824347e780447dbfc160643e0d282e',
        users: 332073,
        type: 'SKIN',
        timeAdded: '2016-04-26T20:10:16.000Z',
        model: 'STEVE',
        images: {
          face: 'https://tx.mcskinhistory.net/skin/94/face.png',
          full: 'https://tx.mcskinhistory.net/skin/94/full.png',
        },
      },
      {
        id: 3,
        staticIdentifier: 'alex',
        hash: '3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3',
        url: 'http://textures.minecraft.net/texture/3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3',
        firstUser: '902fe14a56544515b9c3bb78630359fa',
        users: 216231,
        type: 'SKIN',
        timeAdded: '2016-04-26T19:50:43.000Z',
        model: 'ALEX',
        images: {
          face: 'https://tx.mcskinhistory.net/skin/3/face.png',
          full: 'https://tx.mcskinhistory.net/skin/3/full.png',
        },
      },
      {
        id: 9106302,
        staticIdentifier: null,
        hash: '31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb',
        url: 'http://textures.minecraft.net/texture/31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb',
        firstUser: 'ba1ef65e576a4eca88d8dfd3aa585619',
        users: 11189,
        type: 'SKIN',
        timeAdded: '2022-10-21T02:44:06.000Z',
        model: 'STEVE',
        images: {
          face: 'https://tx.mcskinhistory.net/skin/9106302/face.png',
          full: 'https://tx.mcskinhistory.net/skin/9106302/full.png',
        },
      },
    ]);

    const skins = await mcskinhistory.getSkinList({
      sort: 'popular',
      limit: 3,
    });

    expect(skins.length).toBe(3);

    expect(skins[0].id).toBe(94);
    expect(skins[0].hash).toBe('1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b');
    expect(skins[0].url).toBe(
      'http://textures.minecraft.net/texture/1a4af718455d4aab528e7a61f86fa25e6a369d1768dcb13f7df319a713eb810b'
    );
    expect(skins[0].firstUser).toBe('44824347e780447dbfc160643e0d282e');
    expect(skins[0].users).toBe(332073);
    expect(skins[0].type).toBe('SKIN');
    expect(skins[0].timeAdded).toBe('2016-04-26T20:10:16.000Z');
    expect(skins[0].model).toBe('STEVE');
    expect(skins[0].images.face).toBe('https://tx.mcskinhistory.net/skin/94/face.png');
    expect(skins[0].images.full).toBe('https://tx.mcskinhistory.net/skin/94/full.png');

    expect(skins[1].id).toBe(3);
    expect(skins[1].hash).toBe('3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3');
    expect(skins[1].url).toBe(
      'http://textures.minecraft.net/texture/3b60a1f6d562f52aaebbf1434f1de147933a3affe0e764fa49ea057536623cd3'
    );
    expect(skins[1].firstUser).toBe('902fe14a56544515b9c3bb78630359fa');
    expect(skins[1].users).toBe(216231);
    expect(skins[1].type).toBe('SKIN');
    expect(skins[1].timeAdded).toBe('2016-04-26T19:50:43.000Z');
    expect(skins[1].model).toBe('ALEX');
    expect(skins[1].images.face).toBe('https://tx.mcskinhistory.net/skin/3/face.png');
    expect(skins[1].images.full).toBe('https://tx.mcskinhistory.net/skin/3/full.png');

    expect(skins[2].id).toBe(9106302);
    expect(skins[2].hash).toBe('31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb');
    expect(skins[2].url).toBe(
      'http://textures.minecraft.net/texture/31f477eb1a7beee631c2ca64d06f8f68fa93a3386d04452ab27f43acdf1b60cb'
    );
    expect(skins[2].firstUser).toBe('ba1ef65e576a4eca88d8dfd3aa585619');
    expect(skins[2].users).toBe(11189);
    expect(skins[2].type).toBe('SKIN');
    expect(skins[2].timeAdded).toBe('2022-10-21T02:44:06.000Z');
    expect(skins[2].model).toBe('STEVE');
    expect(skins[2].images.face).toBe('https://tx.mcskinhistory.net/skin/9106302/face.png');
    expect(skins[2].images.full).toBe('https://tx.mcskinhistory.net/skin/9106302/full.png');
  });
});
