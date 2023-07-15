import { FILE_ERROR_TYPES, MAX_FILE_SIZE } from 'constant';
import { IncomingForm } from 'formidable';
import { FileError, isAllowedFileType } from 'utils';

class FormParser {
    constructor() {
        this.form = new IncomingForm({
            keepExtensions: true,
            maxFileSize: MAX_FILE_SIZE,
            allowEmptyFiles: false,
        });
    }

    async parseForm(req) {
        try {
            const [fields, files] = await this.form.parse(req);
            const transformedFields = {};
            for (const key in fields) {
                if (fields.hasOwnProperty(key)) {
                    transformedFields[key] = fields[key][0];
                }
            }
            const file = files.file[0];
            if (!isAllowedFileType(file)) {
                throw new FileError(
                    FILE_ERROR_TYPES.INVALID_FILE_TYPE.msg,
                    FILE_ERROR_TYPES.INVALID_FILE_TYPE.status
                );
            }
            return [transformedFields, files];
        } catch (error) {
            throw new FileError();
        }
    }
}

export default FormParser;
