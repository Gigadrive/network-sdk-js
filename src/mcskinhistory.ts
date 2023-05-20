import axios, { type AxiosInstance } from 'axios';

/**
 * MCSkinHistory is a service that allows you to access the largest set of Minecraft-related data and information to boost your app.
 *
 * This client allows you to interact with the MCSkinHistory Data API.
 *
 * @see https://docs.gigadrive.network/products/mcskinhistory
 */
export default class MCSkinHistory {
  public readonly apiKey: string;
  public readonly baseURL: string;
  public readonly axios: AxiosInstance;

  /**
   * @param apiKey The API key to use for authentication.
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(apiKey: string, baseURL: string = 'https://api.gigadrive.network') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;

    this.axios = axios.create({
      baseURL: this.baseURL,
    });
  }

  /**
   * Retrieve a player's basic profile data.
   *
   * Required API Key permission: `mcskinhistory:player:get`
   *
   * @returns The player's profile data, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-a-player-profile
   */
  async getPlayerProfile(options: { query: string }): Promise<PlayerProfile | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve a player's name history.
   *
   * Required API Key permission: `mcskinhistory:player-names:get`
   *
   * @returns The player's name history, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-name-history
   */
  async getPlayerNames(options: { query: string }): Promise<Name[] | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player/names', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve the skins a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-skins:get`
   *
   * @returns The player's MCSkinHistory textures containing skins, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-skins
   */
  async getPlayerSkins(options: { query: string }): Promise<SkinTexture[] | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player/skins', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve the Mojang capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-mojang-capes:get`
   *
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-mojang-capes
   */
  async getPlayerMojangCapes(options: { query: string }): Promise<CapeTexture[] | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player/mojang-capes', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve the Optifine capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-optifine-capes:get`
   *
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-optifine-capes
   */
  async getPlayerOptifineCapes(options: { query: string }): Promise<CapeTexture[] | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player/optifine-capes', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve the custom capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-custom-capes:get`
   *
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-custom-capes
   */
  async getPlayerCustomCapes(options: { query: string }): Promise<CapeTexture[] | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/player/custom-capes', {
        params: { id: options.query },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve a server's profile data.
   *
   * Required API Key permission: `mcskinhistory:server:get`
   *
   * @returns The server's profile data, or `null` if the server could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-server-information
   */
  async getServerProfile(options: { ip: string }): Promise<ServerProfile | null> {
    try {
      const { data } = await this.axios.get('/mcskinhistory/server', {
        params: { ip: options.ip },
      });

      return data;
    } catch (e) {
      if (e.response.status === 404) {
        return null;
      }

      throw e;
    }
  }

  /**
   * Retrieve the historical player count of a server.
   *
   * Required API Key permission: `mcskinhistory:server-player-history:get`
   *
   * @param options.ip The server's IP address or domain
   * @param options.rangeStart The start of the range to retrieve data for. Defaults to 24 hours ago.
   * @param options.rangeEnd The end of the range to retrieve data for. Defaults to now.
   */
  async getServerPlayerHistory(options: {
    ip: string;
    rangeStart?: Date | number | string;
    rangeEnd?: Date | number | string;
  }): Promise<ServerPlayerHistoryEntry[]> {
    // convert dates to ISO strings
    if (options.rangeStart instanceof Date) {
      options.rangeStart = options.rangeStart.toISOString();
    } else if (typeof options.rangeStart === 'number') {
      options.rangeStart = new Date(options.rangeStart).toISOString();
    }

    if (options.rangeEnd instanceof Date) {
      options.rangeEnd = options.rangeEnd.toISOString();
    } else if (typeof options.rangeEnd === 'number') {
      options.rangeEnd = new Date(options.rangeEnd).toISOString();
    }

    const { data } = await this.axios.get('/mcskinhistory/server/player-history', {
      params: {
        ip: options.ip,
        rangeStart: options.rangeStart,
        rangeEnd: options.rangeEnd,
      },
    });

    return data;
  }

  /**
   * Retrieve a list of skins from MCSkinHistory.
   *
   * @param options.sort Whether to fetch the newest or most popular skins
   * @param options.limit The maximum amount of skins to retrieve
   */
  async getSkinList(options: { sort?: 'new' | 'popular'; limit?: number }): Promise<SkinFile[]> {
    const { data } = await this.axios.get('/mcskinhistory/skins', {
      params: { sort: options.sort ?? 'new', limit: options.limit ?? 25 },
    });

    return data;
  }
}

export interface ServerProfile {
  ip: string;
  name?: string | null;
  votes: number;
  version?: string | null;
  uptime: number;
  lastPing?: string | null;
  country?: string | null;
  players: {
    online: number;
    max: number;
    peak: number;
  };
  images: {
    icon?: string | null;
    logo?: string | null;
    background?: string | null;
  };
  social: {
    website?: string | null;
    mcskinhistory?: string | null;
    twitter?: string | null;
    discordInvite?: string | null;
    discordId?: string | null;
    teamspeak?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    facebook?: string | null;
    instagram?: string | null;
    shop?: string | null;
    support?: string | null;
    youtubeVideo?: string | null;
  };
  motd: {
    raw?: string | null;
    html?: string | null;
  };
  blockData: {
    blocked: boolean;
    lastBlockedTime?: string | null;
  };
  alternativeAddresses: string[];
  categories: ServerCategory[];
}

export interface ServerPlayerHistoryEntry {
  time: string;
  players: number;
}

export enum ServerCategory {
  ADVENTURE = 'ADVENTURE',
  ANARCHY = 'ANARCHY',
  ANNIHILATION = 'ANNIHILATION',
  BEDWARS = 'BEDWARS',
  BLOCKS_VS_ZOMBIES = 'BLOCKS_VS_ZOMBIES',
  BUKKIT = 'BUKKIT',
  CAPTURE_THE_FLAG = 'CAPTURE_THE_FLAG',
  COPS_AND_ROBBERS = 'COPS_AND_ROBBERS',
  CREATIVE = 'CREATIVE',
  DUNGEONS = 'DUNGEONS',
  ECONOMY = 'ECONOMY',
  EGGWARS = 'EGGWARS',
  FACTIONS = 'FACTIONS',
  FEED_THE_BEAST = 'FEED_THE_BEAST',
  GTA = 'GTA',
  HARDCORE = 'HARDCORE',
  HEXXIT = 'HEXXIT',
  KITPVP = 'KITPVP',
  LAND_CLAIM = 'LAND_CLAIM',
  LUCKYBLOCK = 'LUCKYBLOCK',
  MCMMO = 'MCMMO',
  MAGIC_WORLD = 'MAGIC_WORLD',
  MANHUNT = 'MANHUNT',
  MINDCRACK = 'MINDCRACK',
  MINEZ = 'MINEZ',
  MINIGAMES = 'MINIGAMES',
  NO_WHITELIST = 'NO_WHITELIST',
  ONEBLOCK = 'ONEBLOCK',
  PARKOUR = 'PARKOUR',
  PETS = 'PETS',
  PIXELMON = 'PIXELMON',
  PRISON = 'PRISON',
  PVE = 'PVE',
  PVP = 'PVP',
  ROLEPLAY = 'ROLEPLAY',
  SKYBLOCK = 'SKYBLOCK',
  SKYWARS = 'SKYWARS',
  SPIGOT = 'SPIGOT',
  SPOUTCRAFT = 'SPOUTCRAFT',
  SURVIVAL = 'SURVIVAL',
  SURVIVAL_GAMES = 'SURVIVAL_GAMES',
  TEAM_PVP = 'TEAM_PVP',
  TNT_RUN = 'TNT_RUN',
  TEKKIT = 'TEKKIT',
  TOWNY = 'TOWNY',
  VANILLA = 'VANILLA',
  VOTING_REWARDS = 'VOTING_REWARDS',
  WHITELIST = 'WHITELIST',
}

export interface PlayerProfile {
  id: string;
  idFormatted: string;
  username: string;
  detectionDate: string;
  creationDate?: string | null;
}

export interface Name {
  name: string;
  changedToAt?: number;
}

export interface Texture {
  id: number;
  timeAdded: string;
}

export interface SkinTexture extends Texture {
  file: SkinFile;
}

export interface CapeTexture extends Texture {
  file: CapeFile;
}

export interface BaseSkinFile {
  id: number;
  staticIdentifier?: string | null;
  hash: string;
  url: string;
  firstUser?: string | null;
  users: number;
  type: SkinFileType;
  timeAdded: string;
}

export interface SkinFile extends BaseSkinFile {
  model: 'STEVE' | 'ALEX';
  images: {
    face: string;
    full: string;
  };
}

export interface CapeFile extends BaseSkinFile {
  images: {
    cape: string;
  };
}

export type SkinFileType = 'SKIN' | 'CAPE_MOJANG' | 'CAPE_OPTIFINE' | 'CAPE_LABYMOD';
