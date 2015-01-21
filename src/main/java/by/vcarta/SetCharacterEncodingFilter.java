package by.vcarta;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * <p>This filter sets the character encoding for request in case, when no encoding specified in request
 * header, otherwise filter has no effect. When header does not specify encoding, used character encoding,
 * specified in parameter. If no encoding specified in parameter, used default encoding.</p>
 *
 * <p>Next parameter required to be specified:</p>
 * <ul>
 * <li><strong>encoding</strong> - The character encoding to be configured for request.</li>
 * </ul>
 */
public class SetCharacterEncodingFilter implements Filter {

    /** Encoding parameter name constant */
    public static String ENCODING_PARAMETER = "encoding";

    /** Default encoding constant */
    public static String DEFAULT_ENCODING = "UTF-8";

    /** Character encoding to be used */
    private String encoding = null;

    /**
     * Returns encoding property.
     *
     * @return encoding property.
     */
    synchronized public String getEncoding() {
        return encoding;
    }

    /**
     * Method brings up filter in usage.
     *
     * @param filterConfig The filter configuration object
     */
    public void init(final FilterConfig filterConfig) throws ServletException {
        String enc = filterConfig.getInitParameter(ENCODING_PARAMETER);
        if (enc == null) {
            enc = DEFAULT_ENCODING;
        }
        synchronized (this) {
            encoding = enc;
        }
    }

    /**
     * Method called when filter no more in use
     */
    public void destroy() {
        // nothing to do here
    }

    /**
     * This method sets specified character encoding to request, according to specification above.
     *
     * @param request The servlet request we are processing
     * @param response The servlet response we are creating
     * @param chain The filter chain we are processing
     *
     * @exception IOException if an input/output error occurs
     * @exception ServletException if a servlet error occurs
     */
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if(request.getCharacterEncoding() == null) {
            request.setCharacterEncoding(getEncoding());
        }
        HttpServletResponse resp = (HttpServletResponse)response;
        HttpServletRequest req = (HttpServletRequest)request;
        System.out.println("req = " + req);

        chain.doFilter(request, response);
    }
}