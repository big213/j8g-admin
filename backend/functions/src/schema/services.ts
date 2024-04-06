import { userRole } from "./enums";
import { KenumService } from "./core/services";

import { UserService } from "./models/user/service";
import { ApiKeyService } from "./models/apiKey/service";
import { GithubService } from "./models/github/service";
import { FileService } from "./models/file/service";
import { AdminService } from "./models/admin/service";
import { ArticleService } from "./models/article/service";
import { TagService } from "./models/tag/service";
import { NavigationItemService } from "./models/navigationItem/service";
/** END Service Import */

import { UserUserFollowLinkService } from "./links/userUserFollowLink/service";
import { ArticleTagLinkService } from "./links/articleTagLink/service";
/** END LINK Service Import */

export const User = new UserService();
export const ApiKey = new ApiKeyService();
export const File = new FileService();
export const Github = new GithubService();
export const Admin = new AdminService();
export const Article = new ArticleService();
export const Tag = new TagService();
export const NavigationItem = new NavigationItemService();
/** END Service Set */

export const UserUserFollowLink = new UserUserFollowLinkService();
export const ArticleTagLink = new ArticleTagLinkService();
/** END LINK Service Set */

export const UserRole = new KenumService(userRole);
