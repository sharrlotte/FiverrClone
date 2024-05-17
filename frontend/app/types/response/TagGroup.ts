
import { TAG_SEPARATOR } from '@/app/constant/constant';
import { Tags } from '@/app/types/response/Tag';
import _ from 'lodash';

type TagGroup = {
    name: string;
    value: string[];
    color: string;
    duplicate: boolean;
};

export default TagGroup;

export type AllTagGroup = {
    schematic: TagGroup[];
    map: TagGroup[];
    post: TagGroup[];
    plugin: TagGroup[];
};

export class TagGroups {
    static toString(tags: TagGroup[]) {
        return Tags.toString(Tags.fromTagGroup(tags));
    }

    static parseString(tagsString: string[], tags: TagGroup[]) {
        const tagsClone = _.cloneDeep(tags);
        const tagsArray = _.chain(tagsString)
            .map((value) => value.split(TAG_SEPARATOR))
            .filter((value) => value.length === 2)
            .map((value) => ({ name: value[0], value: value[1] }))
            .groupBy((value) => value.name)
            .map((value, key) => ({ name: key, value: value.map((v) => v.value) }))
            .map((tag) => {
                let result = tagsClone.find(
                    (t) =>
                        t.name === tag.name &&
                        tag.value.every((b) => tag.value.includes(b)),
                );
                // Ignore tag that not match with server
                if (result) {
                    result.value = tag.value;
                }

                return result;
            })
            .compact()
            .value();

        return tagsArray;
    }
}