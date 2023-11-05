import { type BaseRequestOptions, HttpClient } from '../../client';

/**
 * MCSkinHistory is a service that allows you to access the largest set of Minecraft-related data and information to boost your app.
 *
 * This client allows you to interact with the MCSkinHistory Data API.
 *
 * @see https://docs.gigadrive.network/products/mcskinhistory
 */
export class MCSkinHistoryClient extends HttpClient {
  /**
   * @param baseURL The base URL of the API. Defaults to `https://api.gigadrive.network`.
   */
  constructor(baseURL: string = 'https://api.gigadrive.network') {
    super(baseURL);
  }

  /**
   * Retrieve a player's basic profile data.
   *
   * Required API Key permission: `mcskinhistory:player:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's profile data, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-a-player-profile
   */
  async getPlayerProfile(query: string, options: BaseRequestOptions = {}): Promise<PlayerProfile | null> {
    return await this.requestNullable(`/mcskinhistory/player`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve a player's name history.
   *
   * Required API Key permission: `mcskinhistory:player-names:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's name history, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-name-history
   */
  async getPlayerNames(query: string, options: BaseRequestOptions = {}): Promise<Name[] | null> {
    return await this.requestNullable(`/mcskinhistory/player/names`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve the skins a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-skins:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's MCSkinHistory textures containing skins, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-skins
   */
  async getPlayerSkins(query: string, options: BaseRequestOptions = {}): Promise<SkinTexture[] | null> {
    return await this.requestNullable(`/mcskinhistory/player/skins`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve the Mojang capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-mojang-capes:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-mojang-capes
   */
  async getPlayerMojangCapes(query: string, options: BaseRequestOptions = {}): Promise<CapeTexture[] | null> {
    return await this.requestNullable(`/mcskinhistory/player/mojang-capes`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve the Optifine capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-optifine-capes:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-optifine-capes
   */
  async getPlayerOptifineCapes(query: string, options: BaseRequestOptions = {}): Promise<CapeTexture[] | null> {
    return await this.requestNullable(`/mcskinhistory/player/optifine-capes`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve the custom capes a player has on their MCSkinHistory profile.
   *
   * Required API Key permission: `mcskinhistory:player-custom-capes:get`
   *
   * @param query The player's UUID or username
   * @param options The request options
   * @returns The player's MCSkinHistory textures containing capes, or `null` if the player could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-player-custom-capes
   */
  async getPlayerCustomCapes(query: string, options: BaseRequestOptions = {}): Promise<CapeTexture[] | null> {
    return await this.requestNullable(`/mcskinhistory/player/custom-capes`, 'GET', {
      query: { id: query },
      ...options,
    });
  }

  /**
   * Retrieve a server's profile data.
   *
   * Required API Key permission: `mcskinhistory:server:get`
   *
   * @param ip The server's IP address or domain
   * @param options The request options
   * @returns The server's profile data, or `null` if the server could not be found
   * @see https://docs.gigadrive.network/products/mcskinhistory#retrieve-server-information
   */
  async getServerProfile(ip: string, options: BaseRequestOptions = {}): Promise<ServerProfile | null> {
    return await this.requestNullable(`/mcskinhistory/server`, 'GET', {
      query: { ip },
      ...options,
    });
  }

  /**
   * Retrieve the historical player count of a server.
   *
   * Required API Key permission: `mcskinhistory:server-player-history:get`
   *
   * @param ip The server's IP address or domain
   * @param options The request options
   */
  async getServerPlayerHistory(
    ip: string,
    options: ServerPlayHistoryRequestOptions = {}
  ): Promise<ServerPlayerHistoryEntry[]> {
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

    return await this.request('/mcskinhistory/server/player-history', 'GET', {
      query: {
        ip,
        rangeStart: options.rangeStart,
        rangeEnd: options.rangeEnd,
      },
      ...options,
    });
  }

  /**
   * Retrieve a list of skins from MCSkinHistory.
   *
   * @param options The request options
   */
  async getSkinList(options: SkinListRequestOptions = {}): Promise<SkinFile[]> {
    return await this.request('/mcskinhistory/skins', 'GET', {
      query: { sort: options.sort ?? 'new', limit: options.limit ?? 25 },
      ...options,
    });
  }
}

interface ServerPlayHistoryRequestOptions extends BaseRequestOptions {
  /**
   * The start of the range to retrieve data for. Defaults to 24 hours ago.
   */
  rangeStart?: Date | number | string;

  /**
   * The end of the range to retrieve data for. Defaults to now.
   */
  rangeEnd?: Date | number | string;
}

interface SkinListRequestOptions extends BaseRequestOptions {
  /**
   * Whether to fetch the newest or most popular skins
   */
  sort?: 'new' | 'popular';

  /**
   * The maximum amount of skins to retrieve
   */
  limit?: number;
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

export default new MCSkinHistoryClient();
